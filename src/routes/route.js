const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth = require("../middlewares/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )     //1

router.post("/login", userController.loginUser)   //2

//The userId is sent by front end
router.get("/users/:userId", auth.validateToken, userController.getUserData)   //3

router.put("/users/:userId", auth.validateToken, userController.updateUser)

router.delete("/users/:userId", auth.validateToken, userController.deleteUser)

module.exports = router;