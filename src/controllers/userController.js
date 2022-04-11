const UserModel= require("../models/userModel")

const bookdata= async function (req, res) {    
    let data= req.body
    let savedbookData= await UserModel.create(data)
    res.send({msg: savedbookData})
}

const getbookdata= async function (req, res) {     
    let allbook= await UserModel.find()
    res.send({msg: allbook})
}

module.exports.bookdata= bookdata
module.exports.getbookdata= getbookdata