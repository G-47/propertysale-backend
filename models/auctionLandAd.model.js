const mongoose = require('mongoose');

var auctionLandAdSchema = new mongoose.Schema({
    title:{type:String},
    type:{type:String},
    size:{type:String},
    description:{type:String},
    threeSixtyImageUrl:{type:String},
    extracts:{type:Array},
    otherImages:{type:Array},
    location: {type: String},
    mapCordinates:{type:Object},
    startDate:{type: Date},
    endDate:{type: Date},
    startBid:{type: Number}
});

mongoose.model('AuctionLandAd',auctionLandAdSchema);