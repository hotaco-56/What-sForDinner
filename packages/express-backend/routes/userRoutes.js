import express from "express";
import userServices from "../models/users-services.js";
import UserSchema from "../models/users.js";
import usersServices from "../models/users-services.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let users = await usersServices.getUsers();
  if (!users) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(users);
  }
});

//NOT implemented with db
router.get("/favorites", (req, res) => {
  let user = userServices.findUserById(111);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json({ favorites: user.favorites });
});

//NOT implemented with db
router.post("/toggle-favorites", (req, res) => {
  const { userId, restaurantId } = req.body;

  let user = userServices.findUserById(111);
  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.favorites.includes(restaurantId)) {
    user.favorites = user.favorites.filter((id) => id !== restaurantId);
  } else {
    user.favorites.push(restaurantId);
  }

  res.json({ favorites: user.favorites });
});

export default router;
