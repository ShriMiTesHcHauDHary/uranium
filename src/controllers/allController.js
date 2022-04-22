
const BookModel= require("../models/bookModel")
const authorModel=require("../models/authorModel");
const bookModel = require("../models/bookModel");

const creatNewAuthor = async function(req,res){
   const reqAuthor = req.body;
   const saveddata = await authorModel.create(reqAuthor)
   res.send({ msg: saveddata})

}

const creatNewbook = async function(req,res){
    const reqbook = req.body;
    const saved = await BookModel.create(reqbook)
    res.send({ msg: saved})
 
 }
 const allbooks= async function(req,res){
    const authorDetails = await authorModel.find({author_name: "Chetan Bhagat"})
    const id = authorDetails[0].author_id
    const booksName = await BookModel.find({author_id:id}).select({name:1})
    res.send({ msg: booksName})
 
 }
 const upadatedbookPrice = async function(req,res){
    const bookDetails = await bookModel.find({name:"Two states"})
    const id = bookDetails[0].author_id
    const authorN = await authorModel.find({author_id:id}).select({author_name:1,_id:0})

    const bkName = bookDetails[0].name
    const upadatedPrice =await bookModel.findOneAndUpdate({name:bkName},{price:100},{new:true}).select({price:1,_id:0})

    res.send({msg:authorN, upadatedPrice})
 

}
const authorName=async function(req,res){
   const booksId = await bookModel.find({price: {$gte:50,$lte:100}}).select({author_id:1,_id:0})
   const id = booksId.map(inp => inp.author_id)

   let temp=[]
   for(let i=0; i<id.length; i++){
      let x = id[i]
      const author = await authorModel.find({author_id:x}).select({author_name:1,_id:0})
      temp.push(author)
   }
   const authorName = temp.flat()


   res.send({msg:authorName})
}


module.exports.creatNewAuthor=creatNewAuthor
module.exports.creatNewbook=creatNewbook
module.exports.allbooks=allbooks
module.exports. upadatedbookPrice= upadatedbookPrice
module.exports. authorName= authorName