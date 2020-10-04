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
require('./models/directLand.model');
require('./models/directHouse.model');