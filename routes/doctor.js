const express=require('express')
const router=express.Router();
const doctorControllers=require('../controllers/doctor')


router.post('/api/doctor/register',doctorControllers.postDoctorRegistration)

router.get('/api/doctor/list',doctorControllers.getDoctorsList)

router.get('/api/doctor/my-patients',doctorControllers.getMyPatients)

router.get('/api/doctor/:doctorId',doctorControllers.getDoctorDetails)


module.exports=router;