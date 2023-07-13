const express = require('express');
require("dotenv").config();
const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
const messageRouter = require('./routes/messageRoutes');
const { connectMongoDB } = require('./middlewares/mongoose');
const Users = require('./models/userModel');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 8000;
const io = require('./middlewares/socket');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);


app.use('/api/users', userRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/message', messageRouter);
app.get('/', (req, res) => {
    res.send("Server Online!!"); 
});

connectMongoDB(process.env.MONGO_URI || "").then(result=>{
    const server = app.listen(port,()=>{
        console.log("Server is successfully running on port "+port+" !!");
    });
    const io = require("./middlewares/socket").init(server);
    let users = [];
    io.on("connection", (socket) => {
        console.log("User connected", socket.id);
        socket.on("addUser", (userId) => {
            const isUserExist = users.find((user) => user.userId === userId);
            if (!isUserExist) {
                const user = { userId, socketId: socket.id };
                users.push(user);
                io.emit("getUsers", users);
            }
        });
        socket.on(
            "sendMessage",
            async ({ senderId, receiverId, message, conversationId }) => {
                const receiver = users.find(
                    (user) => user.userId === receiverId
                );
                const sender = users.find((user) => user.userId === senderId);
                const user = await Users.findById(senderId);
                if (receiver) {
                    io.to(receiver.socketId)
                        .to(sender.socketId)
                        .emit("getMessage", {
                            senderId,
                            message,
                            conversationId,
                            receiverId,
                            user: {
                                id: user._id,
                                fullName: user.fullName,
                                email: user.email,
                            },
                        });
                } else {
                    io.to(sender.socketId).emit("getMessage", {
                        senderId,
                        message,
                        conversationId,
                        receiverId,
                        user: {
                            id: user._id,
                            fullName: user.fullName,
                            email: user.email,
                        },
                    });
                }
            }
        );
        socket.on("disconnect", () => {
            users = users.filter((user) => user.socketId !== socket.id);
            io.emit("getUsers", users);
        });
    });
}).catch(console.log);
