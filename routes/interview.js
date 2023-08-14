const express = require('express')
const router = express.Router();
const passport = require('passport')
const interviewController = require('../controllers/interviews_controller');


router.get('/',passport.checkAuthentication, interviewController.interviewsPage);
router.post('/createInterview',passport.checkAuthentication,interviewController.createInterview)
router.post('/update-interview/:id',passport.checkAuthentication,interviewController.updateInterview)
router.get('/delete-interview/:id', passport.checkAuthentication,interviewController.deleteInterview )
module.exports=router;