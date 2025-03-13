import express from "express";
import Users from "../models/users.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id.trim();
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
});

//need to fix
router.post("/", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id/favorites", async (req, res) => {
  try {
    const userId = req.params.id.trim();
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
