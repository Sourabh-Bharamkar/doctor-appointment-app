const { Op } = require("sequelize");

const Patient = require('../models/patient')
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');



exports.postDoctorRegistration = async (req, res, next) => {
    try {

        console.log('Inside postDoctorRegistration controller')
        const { name,email,phone, speciality, location, maxPatientsPerDay } = req.body;
        console.log(req.body)

        await Doctor.create({
            name: name,
            email:email,
            phone:phone,
            location: location,
            speciality: speciality,
            maxPatientsPerDay: maxPatientsPerDay
        })

        res.status(200).json({ success: 'true', message: 'registered successfully' })

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

        const doctorId=req.query.doctorId;
        const doctor = await Doctor.findByPk(doctorId)

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
