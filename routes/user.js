const express=require('express')
const router=express.Router();
const userController=require('../controllers/user')

//route for creating account
router.post('/api/user/signup',userController.postSignupUser)

//route for login
router.post('/api/user/login',userController.postVerifyLoginDetails)


module.exports=router;