const express = require('express');
const router = express.Router();

router.post('/register/', (req, res) => {
    const { fullName, email, password } = req.body;
    
    res.send(email);
});
router.get('/', (req, res) => {
    res.send("User Routes are online!!");
})


module.exports = router;