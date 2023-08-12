const employeeController= require('../controllers/employee_controller.js')
const express = require('express')
const router = express.Router()
router.get('/sign-in',employeeController.signIn)
router.get('/sign-up',employeeController.signUp)
router.post('/create', employeeController.create)
module.exports=router
