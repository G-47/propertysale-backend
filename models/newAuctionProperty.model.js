const mongoose = require('mongoose');

var auctionSchema = new mongoose.Schema({
    title:{type:String},
    startBid:{type:Number},
    interval:{type:Number},
    size:{type:Number},
    propertyType:{type:String},
    location:{type:String},
    desctiption:{type:String},
    image:{type:String},
    startDate:{type:Date},
    endDate:{type:Date},
    currentBid:{type:Number},
    currentBidHolder:{type:String},
    status:{type:String}
});

mongoose.model("NewAuction",auctionSchema);