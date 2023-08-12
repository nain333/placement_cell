const employeeController= require('../controllers/employee_controller.js');
const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/sign-in',employeeController.signIn)
router.get('/sign-up',employeeController.signUp)
router.post('/create', employeeController.create)
router.post('/create-session',passport.authenticate('local',
{failureRedirect:'/employee/sign-in'}), employeeController.createSession)

module.exports=router
