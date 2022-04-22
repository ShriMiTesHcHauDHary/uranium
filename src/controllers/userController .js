const userModel=require("../models/userModel")


const userCreate= async function(req, res) {
    let userDetail=req.body
    let headers=req.headers
    let appType= headers["isFreeAppUser"]
    if(!appType){
        appType=headers["isfreeappuser"]
   }
   if(!appType){
       return res.send({status:false,msg:"headers part is mandatory to fill"})
   }

    let userCreater=await userModel.create(userDetail)
    res.send({status: true, data: {userCreater}})
    
}


module.exports.userCreate=userCreate


