const express = require('express');
const router = express.Router();

const ProductController=require("../controllers/productController")
const UserController=require("../controllers/userController ")
const OrderController=require("../controllers/orderController")




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




router.post('/creatProduct', ProductController.productCreate)   //1

router.post('/userCreate', UserController.userCreate )          //2

router.post('/creatOrder', OrderController.creatOrder)          //3




module.exports = router;