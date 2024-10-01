const User = require('../../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function Login(req,res){
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        console.log('user is founded');

        const validPassowrd = await bcrypt.compare(password,user.password);
        if (!validPassowrd) {
            res.status(400).json({
                message: 'Password is Not valid',
            });
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(tokenData,process.env.TOKEN_KEY, {expiresIn: '4d'});

        res.status(201).json({
            success: true,
            message: 'User is successfully logIn',
            token: token,
        });
    } catch (error) {
        throw new Error('Error In Loging', error);
    }
}

module.exports = Login;
