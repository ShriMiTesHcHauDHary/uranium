const publisherModel= require("../models/publisherM")
const mongoose = require('mongoose');
const createPublisher= async function (req, res) {
    let author = req.body
    if(!req.body.publisher_id){
        res.send("please provide publisherId")
    }
    let authorCreated = await publisherModel.create(author)
    res.send({data: authorCreated})
}


const publisherData= async function (req, res) {
  
    let books = await publisherModel.create(req.body)
    res.send({data: books})
}
module.exports = {createPublisher}
module.exports.publisherData = publisherData