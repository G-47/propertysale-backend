const mongoose = require('mongoose');

var biddingSchema = new mongoose.Schema({
    adID: {type: String},
    userID: {type:String},
    biddingAmount: 
    {
        type:Number,
        required:true,
        unique:true
    },
    type: {type: String},
    postedTime: {type: Number}
});

mongoose.model('Bidding',biddingSchema);