const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookname: String,
    authorname: String,
    registerno : {
        type: String,
        unique: true,                           //this is to identify unique id
        required: true                          //this is to identify that its important to fill
    },
    year : Number,
    category: {
        type: String,
        enum: ["history" , "mythology", "sci-fic" , "biography" , "fictional"] //category must be among these only
    }, 

}, { timestamps: true });

module.exports = mongoose.model('books', bookSchema) //books



