const express = require('express')
const router = express.Router()
const studentController = require('../controllers/students_controller');

router.get('/',(req,res,next)=>{
    console.log('inside the students route')
    next()
}, studentController.studentsPage)

module.exports = router;

