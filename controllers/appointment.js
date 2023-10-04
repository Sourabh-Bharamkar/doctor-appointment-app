const Appointment = require('../models/appointment')
const Doctor = require('../models/doctor')
const User = require('../models/user')



exports.getUsersAppointments = async (req, res, next) => {

    try {

        console.log('Inside getUsersAppointment controller')

        const user = req.user;

        const appointments = await user.getAppointments()
        res.status(200).json({ success: 'true', appointments: appointments })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}


exports.postBookAppointment = async (req, res, next) => {

    try {

        const { date, time, doctorId } = req.body;

        const doctor = await Doctor.findByPk(doctorId)

        //if doctor does not exists then
        if (!doctor) {
            return res.status(400).json({ success: 'false', message: 'doctor does not exist' })
        }

        await req.user.createAppointment({
            date: date,
            time: time,
            status: 'pending',
            doctorId: doctorId
        })


        res.status(200).json({ success: 'true', message: 'appointment scheduled' })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}


exports.postCancelAppointment = async (req, res, next) => {

    try {

        const appointmentId = req.body.appointmentId;
        const appointments = await req.user.getAppointments({ where: { id: appointmentId } })

        if (appointments[0]) {
            await Appointment.update({ status: 'cancelled' }, { where: { id: appointmentId } })
        } else {
            return res.status(400).json({ success: 'false', message: 'cannot find appointment' })
        }

        res.status(200).json({ success: 'true', message: 'appointment cancelled' })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}