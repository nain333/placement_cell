const express = require('express')
const router = express.Router();

const companyController = require('../controllers/company_controller.js')


router.get('/', companyController.companyPage);
router.post('/createCompany', companyController.createCompany);
module.exports = router;