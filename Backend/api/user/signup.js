const mongoose = require('mongoose');
const User = require('../../Model/UserModel');
const bcryptjs = require('bcrypt');

async function Signup(req, res) {
    try {
        const {name, email, password} = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password ,salt);

            const newUser = new User({
                name,
                email,
                password: hashPassword,
            });
            const saveUser = await newUser.save();
            console.log('Saved User data : ', saveUser);
            res.status(201).json({
                succes: true,
                user: saveUser,
            });
        } catch (error) {
            throw new Error('Error: ', error);
        }
}

module.exports = Signup;
