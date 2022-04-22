const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    name:String,
    author_id:{
        type:Number,
        required:true
    },
   
    price:Number,
    rating:String,
}, { timestamps: true });

module.exports = mongoose.model('booklist1', bookSchema) //users
