const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    url : String,
    alt : String,
});

const Image = mongoose.model("image", schema)

module.exports = Image