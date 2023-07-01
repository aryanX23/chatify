const express = require('express');
const router = express.Router();
const { createConversation, getConversationById } = require('../controllers/conversationController');

router.get('/:userId', getConversationById);
router.post('/', createConversation);
router.get('/', (req, res) => {
    res.send("Conversation Routes are Online!");
});



module.exports = router;