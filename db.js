const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (!err) {
    console.log('MongoDB connection succeeded')
  } else {
    console.log('MongoDB connection error ' + JSON.stringify(err, undefined, 2))
  }
});

require('./models/user.model');
require('./models/admin.model');
require('./models/auctionLandAd.model');
require('./models/auctionHouseAd.model');
require('./models/bidding.model');
require('./models/user_bidding.model');
require('./models/message.model');
require('./models/newAuctionProperty.model');
require('./models/directLand.model');
require('./models/directHouse.model');
require('./models/logger.model');
