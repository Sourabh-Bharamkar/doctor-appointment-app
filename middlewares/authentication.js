const User = require('../models/user')
const Doctor = require('../models/doctor')
const jwt = require('jsonwebtoken')


exports.userAuthentication = async (req, res, next) => {

    try {
        console.log('entered into userAuthentication middleware')

        //verigying the token and passing the corresponding user through the request
        const token = req.headers.userauthorizationtoken;
        console.log(token)

        if (token === undefined) {
            return res.status(401).json({ message: 'you are not currently logged in' })
        }
        const user = jwt.verify(token, 'SSB16')
        const user1 = await User.findByPk(user.userId)

        if(user1===null){
           return res.status(401).json({ message: 'authentication error' })
        }
        req.user = user1;
        console.log('user authenticated succesfully')
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'authentication error' })
    }

}



exports.doctorAuthentication = async (req, res, next) => {

    try {
        console.log('entered into doctorAuthentication middleware')

        //verifying the token and passing the corresponding doctor through the request
        const token = req.headers.doctorauthorizationtoken;
        console.log(req.headers)
        console.log(token)

        if (token === undefined) {
            return res.status(401).json({ message: 'you are not registered as doctor' })
        }

        const doctor = jwt.verify(token, 'SSB16')
        const doctor1 = await Doctor.findByPk(doctor.doctorId)

        if(doctor1===null){
           return res.status(401).json({ message: 'authentication error' })
        }

        req.doctor = doctor1;
        console.log('doctor authenticated succesfully')
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'authentication error' })
    }

}