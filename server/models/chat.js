var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  username: String,
  timestamp: String,
  message: String
})

mongoose.model("Chats", ChatSchema);
