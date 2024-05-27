const express = require("express");
const router = express.Router();
const Image = require("../models/image");

router.get("/", async (req, res) => {
    console.log("Find All Image");
    const result =  await Image.find();
    try {
      res.json({rows: result})
    } catch (error) {
      res.status(400).json({ err: error });
    }
  });
  
  router.get("/:id", async (req, res) => {
    console.log("Find All Image");
    try {
      const result = await Image.findById(req?.params?.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ err: error });
    }
  });

  router.post("/", async (req, res) => {
    console.log("Error creating image ", req.body);
    const newImage = new Image(req.body);
    try {
      await newImage.save();
      res.status(201).json(newImage);
    } catch (error) {
      res.status(400).json({ err: error.message });
    }
  }); 

router.delete("/:id", async (req, res) => {
    console.log ("Delete Image")
    try {
        const result = await Image.findByIdAndUpdate(req?.params?.id);
        res.status(204).json(result);
    } catch (error){
        res.status(404).json({ err: error });
    }
    });

    router.put("/", async (req, res) => {
        const image = req.params.id;
        const updatedeData =  req.body;
        try {
            const updatedeImage = await Image.findByIdAndUpdate(imageId);
            return res.status(404).json({message:"Image not found"});
    }
          catch (error){
            res.status(404).json({ err: error });
        
        }});

        module.exports = router;  
