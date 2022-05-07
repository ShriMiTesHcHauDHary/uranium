const express = require("express");
const router = express.Router();//assign value to express router

const collegeController = require("../controllers/collegeControllers");
const internController = require("../controllers/internControllers");
//creating router handler  
//1. api
router.post("/createCollege", collegeController.createCollege);
//2. api
router.post("/createIntern", internController.createIntern);
//3. api
router.get("/collegeDetails", collegeController.collegeDetails);

module.exports = router;
