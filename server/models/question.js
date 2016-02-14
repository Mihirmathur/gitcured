var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: String,
  tags: [String],
  user: {type: Schema.Types.ObjectId, ref: 'Users'},
  up_votes: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  chat: [{type: Schema.Types.ObjectId, ref: 'Chat'}]
})

mongoose.model("Questions", QuestionSchema);
