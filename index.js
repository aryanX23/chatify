const express = require('express');
const userRouter = require('./routes/userRoutes');
const { connectMongoDB } = require('./middlewares/mongoose');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send("Server Online!!"); 
});

connectMongoDB('mongodb://localhost:27017/').then(result=>{
    app.listen(port,()=>{
        console.log("Server is successfully running on port "+port+" !!");
    });
}).catch(console.log);
