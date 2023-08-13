const express = require('express')
const router = express.Router();
const interviewController = require('../controllers/interviews_controller');


router.get('/', interviewController.interviewsPage);
router.post('/createInterview',interviewController.createInterview)

module.exports=router;