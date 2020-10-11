const mongoose = require('mongoose');

var auctionLandAdSchema = new mongoose.Schema({
    title:{type:String},
    type:{type:String},
    size:{type:String},
    description:{type:String},
    threeSixtyImageUrl:{type:String},
    images:{type:Array},
    locationName: {type: String},
    locationMap:{type:Object},
    startDate:{type: Number},
    endDate:{type: Number},
    startBid:{type: Number},
    postedTime:{type:Number}
});

mongoose.model('AuctionLandAd',auctionLandAdSchema);