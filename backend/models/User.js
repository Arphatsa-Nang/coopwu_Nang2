const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  department: String,
  prefix: String,
  age: Number,
  telephone: Number,
  address: String,

});

const User = mongoose.model("User", schema);

module.exports = User;
