const { Op } = require("sequelize");

const User = require('../models/user')
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');
const jwt = require('jsonwebtoken')


function generateAccessToken(id, name) {
    return jwt.sign({ doctorId: id, name: name }, 'SSB16')
}


exports.postDoctorRegistration = async (req, res, next) => {

    try {

        console.log('Inside postDoctorRegistration controller')
        const { name, email, phone, speciality, location, maxPatientsPerDay } = req.body;
        console.log(req.body)

        //check whether any doctor exists with same credentials
        const doctorWithSameEmailOrPhone = await Doctor.findOne({ where: { [Op.or]: [{ email: email }, { phone: phone }] } })

        if (doctorWithSameEmailOrPhone) {
            return res.status(200).json({ success: true, message: 'doctor already exists with same email or phone' })
        }


        const doctor = await Doctor.create({
            name: name,
            email: email,
            phone: phone,
            location: location,
            speciality: speciality,
            maxPatientsPerDay: maxPatientsPerDay
        })

        console.log('hiiiiiiiii')
        res.status(200).json({ success: 'true', message: 'registered successfully', token: generateAccessToken(doctor.id, doctor.name) })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}




exports.getDoctorsList = async (req, res, next) => {

    try {

        const doctors = await Doctor.findAll()
        res.status(200).json({ success: 'true', doctorsList: doctors })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }

}


exports.getDoctorDetails = async (req, res, next) => {

    try {
        console.log('inside getDoctorDetails controller')
        const doctorId = req.params.doctorId;
        console.log(doctorId)

        const doctorDetails = await Doctor.findOne({ where: { id: doctorId } })

        res.status(200).json({ success: 'true', doctorDetails: doctorDetails })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}



exports.getMyPatients = async (req, res, next) => {

    try {

        const doctor = req.doctor;

        const patients = await doctor.getAppointments(
            {
                where: {
                    [Op.or]: [
                        { status: 'pending' }, { status: 'completed' }
                    ]
                }
            }
        )

        res.status(200).json({ success: 'true', patients })

    } catch (err) {

        res.status(500).json({ success: 'false', error: err })
    }
}
