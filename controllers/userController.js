const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');


async function registerUsers(req, res, next){
    const { fullName, email, password } = req.body;
    try {
        const alreadyExists = await Users.findOne({ email });
        if (alreadyExists) {
            res.status(400).send("User Already Exists!");
        }
        else {
            const newUser = new Users({ fullName, email });
            bcrypt.hash(password, 10, (err, hashedPass) => {
                newUser.set('password', hashedPass);
                newUser.save();
                next();
            });
            res.status(200).send("User Registered Successfully!");
        }
    }  
    catch (e) {
        console.log("Error has occured in register route!", e);
    }
}

async function loginUsers(req,res){
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            res.status(400).send("Incorrect Details");
        }
        else {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                res.status(400).send("Incorrect email or password!");
            }
            else {
                const payload = {
                    userId: user._id,
                    email: user.email
                }
                const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "hello this is a test:)";
                const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 10000 });
                await Users.updateOne({ _id: user._id }, {
                        $set: { token }
                    });
                await user.save();
                
                res.status(200).json({user: user, accessToken:token});
                
            }
        }
    }
    catch (e) {
        console.log("An Error has occured in the login route!", e);
    }
}

module.exports = {
    registerUsers,
    loginUsers,
}