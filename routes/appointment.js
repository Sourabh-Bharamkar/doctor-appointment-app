const express=require('express')
const router=express.Router();

const appointmentControllers=require('../controllers/appointment')


router.get('/api/appointment/patient',appointmentControllers.getPatientsAppointment)

router.post('/api/appointment/book',appointmentControllers.postBookAppointment)

router.post('/api/appointment/cancel',appointmentControllers.postCancelAppointment)

module.exports=router;