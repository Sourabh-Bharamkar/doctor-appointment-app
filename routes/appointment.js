const express=require('express')
const router=express.Router();

const appointmentControllers=require('../controllers/appointment')
const authentication=require('../middlewares/authentication')

//route for getting users appointment
router.get('/api/appointment/user',authentication.userAuthentication,appointmentControllers.getUsersAppointments)

//route for booking an appointment
router.post('/api/appointment/book',authentication.userAuthentication, appointmentControllers.postBookAppointment)

//route for cancelling an appointment
router.post('/api/appointment/cancel',authentication.userAuthentication,appointmentControllers.postCancelAppointment)

module.exports=router;