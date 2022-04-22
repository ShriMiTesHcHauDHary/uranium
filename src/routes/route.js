const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")
const mongoose = require('mongoose');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )        //1



router.post("/authorbook", bookController.authorbook )               //3


router.get("/getbookinfo", bookController.getbookinfo)              //4
router.put("/naya", bookController.naya)                            //5a
router.put("/nayasa", bookController.nayasa)                        //5b



router.post("/publisherData", publisherController.publisherData)     //2

module.exports = router;