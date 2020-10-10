const mongoose = require('mongoose');

var user_biddingSchema = new mongoose.Schema({
    adID: {type: String},
    userID: {type:String}
});

mongoose.model('User_bidding',user_biddingSchema);