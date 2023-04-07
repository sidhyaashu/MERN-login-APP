import { Router } from "express";
const router = Router()
import * as controller from '../controllers/appControllers.js'

// POST METHOD
router.route('/register').post(controller.register) // register email
//router.route('/registerMail').post() //send the email
router.route('/authenticate').post((req,res)=>res.end()) //authenticate user
router.route('/login').post(controller.login) //login in application

//GET METHOD
router.route('/user/:username').get(controller.getUser) //user with username
router.route('/generateOTP').get(controller.generateOTP) //generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP) //verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) //reset All the variable

//PUT METHOD
router.route('/updateuser').put(controller.updateUser) //it use to update the user profile
router.route('/resetPassword').put(controller.resetPassword) //use to reset password




export default router