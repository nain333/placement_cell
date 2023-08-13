const express = require('express')
const homeController=require('../controllers/home_controller')
const studentController = require('../controllers/students_controller');


const router = express.Router()
router.get('/',homeController.home)
router.use('/employee',require('./employee'))
router.use('/students', require('./student'))
router.use('/companies', require('./company'))
// router.get('/students', studentController.studentsPage);
module.exports=router;