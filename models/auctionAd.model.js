const mongoose = require('mongoose');

var auctionAdSchema = new mongoose.Schema({
    name:{type:String},
    type:{type:String},
    size:{type:String},
    description:{type:String},
    threeSixtyImageUrl:{type:String},
    extracts:{type:Array},
    otherImages:{type:Array},
    mapCordinates:{type:Array},
    startDate:{type: Date},
    endDate:{type: Date},
    startBid:{type: Number}
});

mongoose.model('AuctionAds',auctionAdSchema);