const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
        required : true
    },
    data: {
        type: Array
    }
}); 
const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;