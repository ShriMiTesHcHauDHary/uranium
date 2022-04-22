const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherM")
const mongoose = require('mongoose');

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}






const authorbook= async function (req, res) {
    
        let book = req.body
        if(!req.body.author_id){
            res.send("please provide authorId")
        }
        if(!req.body.publisher_id){
            res.send("please provide publisherid")
        }
        if(!isValidObjectId(req.body.author_id)){
            res.send({msg:"author id is not valid"})
        }
        if(!isValidObjectId(req.body.publisher_id)){
            res.send({msg:"publisher id is not valid"})
        }
        let bookCreated = await bookModel.create(book)
        res.send({data: bookCreated})
    }








const getBooksData= async function (req, res) {
    let books = await bookModel.find(req.body)
    res.send({data: books})

}






const getbookinfo= async function (req, res) {
    let books = await bookModel.find()
    let authorDetails = await bookModel.find().populate('author_id')
    let publisherDetails = await bookModel.find().populate('publisher_id')
    res.send({data: books , authorDetails , publisherDetails})
}





const naya= async function (req, res) {
   let publisherfirst= await bookModel.updateMany({publisher_id:'625aca3e81ee83a537e9aa14'},{$set:{isHardCover:true}},{new:true, upsert:true})

let publishersecond= await bookModel.updateMany({publisher_id:'625ad452ce94d89a2f81d521'},{$set:{isHardCover:true}},{new:true, upsert:true})
res.send({output:publisherfirst,publishersecond})
}







const nayasa= async function (req, res) {
    let publisherrating= await bookModel.updateMany({ratings : {$gt:3.5}},{$inc:{"price":10}},{new:true, upsert:true})
 

 res.send({output:publisherrating})
 }


module.exports.authorbook= authorbook
module.exports.getBooksData= getBooksData
module.exports.getbookinfo= getbookinfo
module.exports.naya= naya
module.exports.nayasa= nayasa



