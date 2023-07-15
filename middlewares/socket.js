require("dotenv").config();

let io;
module.exports = {
    init: (httpServer) => {
        io = require("socket.io")(httpServer, {
            cors: {
            	origin: process.env.ORIGIN_URL,
                credentials: true
                
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized!");
        }
        return io;
    },
};
