const express=require('express')
const router=express.Router();
const doctorControllers=require('../controllers/doctor')
const authentication=require('../middlewares/authentication')

//route for doctor registration
router.post('/api/doctor/register', authentication.userAuthentication,doctorControllers.postDoctorRegistration)

//route for getting doctors list
router.get('/api/doctor/list',authentication.userAuthentication,doctorControllers.getDoctorsList)

//route for getting doctor's patients
router.get('/api/doctor/my-patients', authentication.doctorAuthentication, doctorControllers.getMyPatients)

//route for getting detailis of doctor
router.get('/api/doctor/:doctorId',authentication.userAuthentication,doctorControllers.getDoctorDetails)


module.exports=router;