const Messages = require('../models/messageModel');

async function getMessage(req, res) {
    try {
        const conversationId = req.params.id;
        const messages = await Messages.findOne({ conversationId });
        //console.log("hit");
        res.send(messages);
    }
    catch (e) {
        console.log("An Error has occured in the getmessages route!", e);
    }
}

async function setMessage(req, res) {
    const { conversationId, senderId, message } = req.body;
    try {
        var obj = { senderId: senderId, message: message };
        await Messages.findOneAndUpdate(
            { conversationId: conversationId },
            { $push: { data: obj } },
        );
        res.send("Message Saved successfully");
    }
    catch (e) {
        console.log("Error occured in setMessage route!", e);
    } 
}

module.exports = {
    getMessage,
    setMessage,
};