const express = require('express')
const router = express.Router();
const passport = require('passport')
const studentController = require('../controllers/students_controller');



router.get('/',passport.checkAuthentication,studentController.studentsPage)
router.post('/createStudent',passport.checkAuthentication, studentController.createStudent)
router.get('/destroy/:id', passport.checkAuthentication,studentController.deleteStudent )

module.exports = router;

