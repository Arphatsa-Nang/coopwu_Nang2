const mongoose = require("mongoose");
const Image = require("./image"); // Assuming the "image" model is in a separate file

const productSchema = new mongoose.Schema({
    Upload: { type: mongoose.Types.ObjectId, ref: "image" },
    Product: String,
    Price: Number,
    Description: String,
    Category: String,
    stock: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;