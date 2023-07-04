const express = require('express');
const router = express.Router();
const { registerUsers, loginUsers, checkLoggedIn, logOut } = require('../controllers/userController');
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.post('/register/', registerUsers);

router.post('/login/', loginUsers);

router.post('/checkAuth/', checkLoggedIn);

router.post('/logOut/', logOut);

router.get('/', (req, res) => {
    res.send("User Routes are online!!");
});

module.exports = router;