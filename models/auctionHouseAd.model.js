const mongoose = require('mongoose');

var auctionHouseAdSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    bedRooms:{type:Number},
    bathRooms:{type:Number},
    images:{type:Array},
    locationName: {type: String},
    locationMap:{type:Object},
    startDate:{type: Number},
    endDate:{type: Number},
    startBid:{type: Number},
    postedTime:{type:Number}
});

mongoose.model('AuctionHouseAd',auctionHouseAdSchema);