const express = require('express');
const { addCompany, getCompanies } = require('../controllers/companyController');
const { requireSignin } = require('../helpers/commonmiddleware');
const router = express.Router();

router.post('/company/create', requireSignin, addCompany);
router.get('/company/list', requireSignin, getCompanies)

module.exports = router;