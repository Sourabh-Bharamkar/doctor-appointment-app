const { Op } = require('sequelize');
const User = require('../models/user');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



exports.postSignupUser = async (req, res, next) => {

    try {

        console.log('inside postSignupUser controller')
        const { name, email, phone, password, address } = req.body;

        //if user exists with same credentials then
        const usersWithSameEmailOrPhone = await User.findOne({ where: { [Op.or]: [{ email: email }, { phone: phone }] } })
        console.log(usersWithSameEmailOrPhone)
        if (usersWithSameEmailOrPhone) {
            return res.status(200).json({ success: true, message: 'user already exists with same email' })
        }

        //create user in the database
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            console.log('password hashing')
            const user = await User.create({
                name: name,
                email: email,
                phone: phone,
                password: hash,
                address: address
            })

            res.status(201).json({ success: true, message: 'Account created successfully' })
        })


    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}



function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, 'SSB16')
}


exports.postVerifyLoginDetails = async (req, res, next) => {

    try {

        console.log('inside postVerifyLoginDetails controller')
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }


        bcrypt.compare(password, user.password, (err, match) => {
            console.log(match)
            if (!match) {
                res.status(400).json({ message: 'password is incorrect' })
            }
            else {
                return res.status(200).json({ message: 'login successful', token: generateAccessToken(user.id, user.name) })
            }

        })

    } catch (err) {

        res.status(500).json({ success: 'false', error: err })

    }

}
