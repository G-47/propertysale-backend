const mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    adminId:{type:String},
    name:{type:String},
    message:{type:String},
});

mongoose.model('Message',messageSchema);