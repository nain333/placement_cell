const express = require('express')
const homeController=require('../controllers/home_controller')
const studentController = require('../controllers/students_controller');
const downloadController = require('../controllers/downloadController')
const passport = require('passport');

const router = express.Router()
router.get('/',homeController.home)
router.use('/employee',require('./employee'))
router.use('/students', require('./student'))
router.use('/companies', require('./company'))
router.use('/interviews', require('./interview'))
router.get('/download-students-csv', passport.checkAuthentication, downloadController.downloadStudentsCSV)


module.exports=router;