const express = require('express');
const router = express.Router();
const { getMessage, setMessage } = require('../controllers/messageController');

router.post('/set', setMessage);
router.get('/get/:id', getMessage);
router.get('/', (req, res) => { 
    res.send("Message Routes are online!");
}); 

module.exports = router;