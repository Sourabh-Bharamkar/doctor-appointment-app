const Appointment = require('../models/appointment')
const Doctor = require('../models/doctor')
const Patient=require('../models/patient')



exports.getPatientsAppointment = async (req, res, next) => {

    try {
        
        console.log('Inside getPatientsAppointment controller')

        const patient=await Patient.findByPk(req.query.patientId)
        
        const appointments = await patient.getAppointments()
        res.status(200).json({ success: 'true', appointments: appointments })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}


exports.postBookAppointment = async (req, res, next) => {
    
    try {

        const { date, time, patientId, doctorId } = req.body;
        const patient=await Patient.findByPk(patientId)
        const doctor=await Doctor.findByPk(doctorId)

        //if either patient or doctor does not exists then
        if(!patient || !doctor){
            return res.status(400).json({success:'false',message:'either patient or doctor does not exist'})
        }

        await Appointment.create({
            date: date,
            time: time,
            status: 'pending',
            patientId: patientId,
            doctorId: doctorId
        })

        res.status(200).json({ success: 'true', message: 'appointment scheduled' })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}


exports.postCancelAppointment = async (req, res, next) => {

    try {

        const appointmentId=req.body.appointmentId;
        await Appointment.update({status:'cancelled'},{where:{id:appointmentId}})

        res.status(200).json({ success: 'true', message: 'appointment cancelled' })

    } catch (err) {
        res.status(500).json({ success: 'false', error: err })
    }
}