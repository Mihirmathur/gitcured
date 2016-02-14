var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'Users'},
  question: String,
  tags: [String],
  up_votes: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  chat: [Schema.Types.Mixed]
})

mongoose.model("Questions", QuestionSchema);
