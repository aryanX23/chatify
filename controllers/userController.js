const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function registerUsers(req, res, next){
    const { fullName, email, password } = req.body;
    try {
        const alreadyExists = await Users.findOne({ email });
        if (alreadyExists) {
            res.status(400).send({ response: "User Already Exists!" });
        }
        else {
            const newUser = new Users({ fullName, email });
            bcrypt.hash(password, 10, (err, hashedPass) => {
                newUser.set('password', hashedPass);
                newUser.save();
                next();
            });
            res.status(200).send("User Registration Successful!");
        }
    }  
    catch (e) {
        console.log("Error has occured in register route!", e);
        res.status(400).send("Internal Error has Occured!");
    }
}

async function loginUsers(req,res){
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            res.status(400).send({response:"Incorrect Email!"});
        }
        else {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                res.status(400).send({ response: "Incorrect password!" });
            }
            else {
                const payload = {
                    userId: user._id,
                    email: user.email
                }
                const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "hello this is a test:)";
                const token = jwt.sign(payload, JWT_SECRET_KEY);
                await Users.updateOne({ _id: user._id }, {
                        $set: { token }
                });
                await user.save();
                res.status(200).cookie('JWT_TOKEN',token, { maxAge: 900000, httpOnly: true, secure: true, sameSite: 'none'})
                    .json({ response: "User Logged In Successfully!", user: user, authenticated: true });
            }
        }
    }
    catch (e) {
        console.log("An Error has occured in the login route!", e);
        res.status(400).send({ response: "Internal Error!" });
    }
}
async function checkLoggedIn(req, res) {
    try {
        const token = req.cookies.JWT_TOKEN;
        const { userId } = req.body;
        const user = await Users.findOne({ _id: userId });
        if (typeof(token) !== "undefined" && user !== null) {
            if (user.token === token) {
                res.status(200).send({ authenticated: true });
                return;
            }
            else {
                res.status(200).send({ authenticated: false });
                return;
            }
        }
        else if (user === null) {
            res.status(200).send({ authenticated: false });
            return;
        }
        else {
            await Users.updateOne({ _id: userId }, {
                        $unset: { token:user.token }
            });
            res.status(200).send({ authenticated: false });
            return;
        }
    }
    catch (e) {
        console.log("Error Occured in checkLoggedIn Route!", e);
        res.status(200).send({ authenticated: false });
            return;
    }
}

async function logOut(req, res) {
    try {
        const { userId } = req.body;
        const user = await Users.findOne({ _id: userId });
        await Users.updateOne({ _id: userId }, {
            $unset: { token:user.token }
        });
        res.status(200).clearCookie("JWT_TOKEN").send({ authenticated: false });
    }
    catch (e) {
        console.log("An Error has Occurred in the logOut route");
        res.status(200).clearCookie("JWT_TOKEN").send({ authenticated: false });
    }
}

module.exports = {
    registerUsers,
    loginUsers,
    checkLoggedIn,
    logOut
}