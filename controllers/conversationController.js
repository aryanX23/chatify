const Conversations = require('../models/conversationModel');
const Users = require('../models/userModel');
const Messages = require('../models/messageModel');

async function createConversation(req, res) {
    try {
        const { senderId, receiverId } = req.body;
        const checkExists = await Users.findById(receiverId);
        const isPresent = await Conversations.find();
        if (isPresent.length !== 0) {
            for (let i = 0; i < isPresent.length; i++) {
                const members = isPresent[i].members;
                if ((members[0] === senderId && members[1] === receiverId)||(members[0] === receiverId && members[1] === senderId)) {
                    res.send("User Already Exists!");
                    return;
                }
            }
        }
        const newConversation = new Conversations({ members: [senderId, receiverId ] });
        await newConversation.save();
        const newMessage = new Messages({ conversationId: newConversation._id, data: [] });
        await newMessage.save();
        res.status(200).send("New Conversation created successfully!");
    }
    catch (e) {
        console.log("An Error has occured in the createConversation route!", e);
        res.status(200).send("Id does not exists!!");
        return;
    }
}

async function getConversationById(req, res) {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: userId } });
        const conversationUserData = Promise.all(
            conversations.map(async (conversation) => {
                const receiverId = conversation.members.find((member) => member !== userId);
                const user = await Users.findById(receiverId);
                return { user: { email: user.email, fullName: user.fullName }, conversationId: conversation._id };
            })
        ); 
        res.status(200).json(await conversationUserData);
    }
    catch (e) {
        console.log("An error has occured in the getConversationById route!")
    }
}

module.exports = {
    createConversation,
    getConversationById,
};