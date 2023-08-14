const express = require('express')
const router = express.Router();
const passport = require('passport')
const companyController = require('../controllers/company_controller.js')


router.get('/',passport.checkAuthentication, companyController.companyPage);
router.post('/createCompany',passport.checkAuthentication, companyController.createCompany);
module.exports = router;