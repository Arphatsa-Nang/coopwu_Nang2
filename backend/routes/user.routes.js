const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    console.log("Find All Users");
    try {
      const result = await User.find();
      res.json({ rows: result });
    } catch (error) {
      res.status(404).json({ err: error });
    }
  });
  
  router.get("/:id", async (req, res) => {
    console.log("Find All Users");
    try {
      const result = await User.findById(req?.params?.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ err: error });
    }
  });

  
router.post("/", async (req, res) => {
    console.log("Create User Body", req.body);
    const newUser = new User(req.body);
    try {
      await newUser.save({});
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ err: error });
    }
  });

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ err: "User not found." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ err: error });
    }
});

module.exports = router;