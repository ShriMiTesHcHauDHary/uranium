
const productModel=require("../models/productModel")

const productCreate= async function(req, res) {
    let body=req.body
    let productDetails= await productModel.create(body)
    res.send({ msg: productDetails})
    
    }


module.exports.productCreate = productCreate




