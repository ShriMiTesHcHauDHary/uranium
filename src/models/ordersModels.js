const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    
       
    
       
        userId: String,
        productId: String,
        amount:Number,
        isFreeAppUser: Boolean, 
        date: String
    
}, { timestamps: true });

module.exports = mongoose.model('ass11order', orderSchema) //users
