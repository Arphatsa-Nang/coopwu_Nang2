const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Image = require("../models/image");

router.get("/", async (req, res) => {
  console.log("Find All Product");
  try {
    const result = await Product.find().populate("Upload");
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Find Product by id");
  try {
    const result = await Product.findById(req?.params?.id);
    const image = await Image.findById(result.Upload);

    res.json({ result: result, image: image });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log("Create Product Body", req.body);

  try {
    const payload = req.body;

    if (req.body.Upload) {
      // ตรงนี้ผิด นะจ่ะ
      // const newImage = new Image({
      //     'url': req.body.Upload
      // });

      const newImage = new Image({
        url: req.body.Upload,
        alt: req.body.Product,
      });
      await newImage.save();
      payload.Upload = newImage._id;
    }

    const newProduct = new Product(payload);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ err: error });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Update Product by id", id, req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  if (req.body.Price) {
    req.body.Price = Number(req.body.Price);
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    console.log("updatedProduct", updatedProduct);
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    


    // Then, if the image needs to be updated, handle the image update
    if (req.body.Upload) {
      const default_image = await Image.findById(updatedProduct.Upload);
      if (default_image) {
        default_image.url = req.body.Upload;
        await default_image.save();
      } else {
        const newImage = new Image({
          url: req.body.Upload,
          alt: req.body.Product,
        });
        await newImage.save();
        updatedProduct.Upload = newImage._id;
        await updatedProduct.save();
      }
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ err: "Product not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
