const express = require("express");
const router = express.Router();

const collegeController = require('../controllers/collegeControllers')
const internController = require('../controllers/internControllers')

router.post('/createCollege', collegeController.createCollege )
router.post('/createIntern', internController.createIntern)
router.get('/collegeDetails', collegeController.collegeDetails)

module.exports = router