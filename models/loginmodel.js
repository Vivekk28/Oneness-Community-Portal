
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({

  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
  phone: { type: Number},
  city: { type: String},
  role: { type:String },
  isregistered: { type:Boolean },
  status: { type:String},
  interests: { type: String },
  journey: { type:String },
  expectations: { type:String },
  activated: { type:Boolean },
  dob: Date,
  created_at: Date,
  updated_at: Date,
  gender:{type:String},
  image:{ type:String}
});

// the schema is useless so far
// we need to create a model using it
var log = mongoose.model('log', userSchema);

// make this available to our users in our Node applications
module.exports = log;