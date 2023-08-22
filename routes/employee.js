const employeeController= require('../controllers/employee_controller.js');
const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/sign-in',employeeController.signIn)
router.get('/sign-up',employeeController.signUp)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failiureRedirect:'/employee/sign-in'}),employeeController.createSession)
router.post('/create', employeeController.create)
router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/employee/sign-in'}), employeeController.createSession)
router.get('/forgot-password',employeeController.forgotPassword)
router.get('/destroy-session',employeeController.destroySession)
router.post('/account-recovery',employeeController.resetPassword)
router.get('/forgot-password',employeeController.forgotPassword)
router.get('/reset-password/:accessToken',employeeController.askNewPassword)
router.post('/reset-password/:accessToken',employeeController.setNewPassword)

module.exports=router
