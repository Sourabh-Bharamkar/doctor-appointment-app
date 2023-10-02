const Patient = require('../models/patient')

exports.postSignupUser = async (req, res, next) => {
    
    try {
        const { name, email, phone, address } = req.body;

        await Patient.create({
            name: name,
            email: email,
            phone: phone,
            address: address
        })

        res.status(200).json({ success: 'true', message: 'account created successfully' })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}