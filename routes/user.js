const express=require('express')
const router=express.Router();
const userController=require('../controllers/user')


router.post('/api/user/signup',userController.postSignupUser)


module.exports=router;