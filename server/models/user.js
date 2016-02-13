var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var Userschema = new Schema({
  email: String,
  password: String,
  age_range: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

Userschema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 12);
};

Userschema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", Userschema);
