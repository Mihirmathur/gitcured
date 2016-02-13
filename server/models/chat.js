var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'Users'},
	timestamp: {type: Date, default: Date.now},
	message: String
})

mongoose.model("Chat",ChatSchema)