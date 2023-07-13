require("dotenv").config();
var cors = require("cors");

let io;
module.exports = {
    init: (httpServer) => {
        io = require("socket.io")(httpServer, {
            cors: {
                credentials: true,
                origin: process.env.ORIGIN_URL
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
