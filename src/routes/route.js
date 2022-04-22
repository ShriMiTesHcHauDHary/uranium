const express = require('express');
const router = express.Router();
const allController= require("../controllers/allController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/createnewAuthor', allController.creatNewAuthor)

router.post('/createnewbook', allController.creatNewbook)

router.get('/allbooks', allController.allbooks)

router.get('/updatedbookprice', allController.upadatedbookPrice)

router.get('/authorName', allController.authorName)





module.exports = router;