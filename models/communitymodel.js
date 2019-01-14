
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({

  
  name: { type: String },
  rule: { type:String },
  desc: {type:String},

  location: { type:String},
   owner: { type: String },
  picture: { type:String },
 
  created_at: Date,
  updated_at: Date,
 
});

// the schema is useless so far
// we need to create a model using it
var community = mongoose.model('community', userSchema);

// make this available to our users in our Node applications
module.exports = community;