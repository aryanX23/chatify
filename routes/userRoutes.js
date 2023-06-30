const express = require('express');
const router = express.Router();
const { registerUsers, loginUsers } = require('../controllers/userController');



router.post('/register/', registerUsers);

router.post('/login/', loginUsers);

router.get('/', (req, res) => {
    res.send("User Routes are online!!");
})

module.exports = router;