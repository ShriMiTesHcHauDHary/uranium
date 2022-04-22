const orderModel=require("../models/ordersModels")
const userModel = require("../models/userModel")
const productModel=require("../models/productModel")

const creatOrder= async function (req, res){
    let orderDetails=req.body
    let headers=req.headers
    let appType=headers["isFreeAppUser"]
    if(!appType){
         appType=headers["isfreeappuser"]
    }
    if(!appType){
        return res.send({status:false,msg:"headers part is mandatory to fill"})
    }
//2
    let userId=orderDetails.userId
    let user=await userModel.findById(userId)
    if(!user){
        return res.send({status:false,msg:"user doesnot exist"})
    }

    let productId=orderDetails.productId
    let product=await productModel.findById(productId)
    if(!product){
        return res.send({status:false,msg:"product doesnot exist"})
    }

    let appTypeFree=false
    if(appType == 'true'){
        appTypeFree = true
    }


    //scenario 1,2,3
    if (!appTypeFree && user.balance >= product.price){
        user.balance =user.balance - product.price
        await user.save()
        
        orderDetails.amount = product.price
        orderDetails.isFreeAppUser= false
        let ordercreated = await orderModel.create(orderDetails)
        return res.send({status: true, data : ordercreated})
    }else if (!appTypeFree){
        return res.send({status: false, message:"user doesnot have stufficient balance"})
    }else{
        orderDetails.amount = 0
        orderDetails.isFreeAppUser = true 
        let orderCreated=await orderModel.create(orderDetails)
        res.send({status:true, data: orderCreated})

    }





    let createOrders=await orderModel.create(orderDetails)
    res.send({status:true, msg:{createOrders}})
}

module.exports.creatOrder=creatOrder