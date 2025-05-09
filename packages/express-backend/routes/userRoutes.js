import express from "express";
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateToken from "./authMiddleware.js";

const router = express.Router();
router.use(express.json());

router.get("/id/:id", async (req, res) => {
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

router.get("/username/:username", async (req, res) => {
  const username = req.params.username;
  console.log(username);
  const user = await Users.find({ name: username });
  console.log(user);
  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "600s",
  });
}

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const passwd = req.body.passwd;

  if (!username || !passwd) {
    return res.status(400).send("Username and password are required");
  }

  const user = await Users.findOne({ name: username });

  if (!user) {
    res.status(404).send("User not found");
  }

  if (user.name && user.passwd) {
    const isValid = await bcrypt.compare(String(passwd), String(user.passwd));
    if (isValid) {
      // Generate token and respond
      const token = generateAccessToken(username);
      res.status(200).send(token);
    } else {
      //Unauthorized due to invalid pwd
      res.status(401).send("Unauthorized");
    }
  } else {
    //Unauthorized due to invalid username
    res.status(401).send("Unauthorized");
  }
});

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const passwd = req.body.passwd;

  if (!username || !passwd) {
    return res.status(400).send("invalid username and passwd");
  }

  const user = await Users.exists({ name: username });

  if (user) {
    return res.status(409).send("Username already taken");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(String(passwd), salt);
    const token = generateAccessToken(username);

    console.log(username);
    console.log(passwd);

    const new_user = [
      {
        name: username,
        passwd: hashedPwd,
      },
    ];

    console.log(new_user);

    await Users.create(new_user);

    console.log("JWT: ", token);
    return res.status(201).send(token);
  }
});

// Route to update user details (bio, email, phone, profilePic)
router.put("/update", authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const { bio, email, phone, profilePic, displayName } = req.body;

    // Validate email format
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate phone format (basic validation)
    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format." });
    }

    const user = await Users.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user details
    if (displayName) user.displayName = displayName;
    if (bio) user.bio = bio;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (profilePic) user.profilePic = profilePic;

    await user.save();
    res
      .status(200)
      .json({ message: "User details updated successfully.", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route to get user details (including favorites)
router.get("/details", authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await Users.findOne({ name: username }).select("-passwd");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Add route to toggle favorite status
router.post("/favorites", authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const { restaurantId } = req.body;

    const user = await Users.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const favoriteIndex = user.favorites.indexOf(restaurantId);
    if (favoriteIndex === -1) {
      // Add to favorites
      user.favorites.push(restaurantId);
    } else {
      // Remove from favorites
      user.favorites.splice(favoriteIndex, 1);
    }

    await user.save();
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error("Error updating favorites:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Add verify token route
router.get("/verify", authenticateToken, (req, res) => {
  try {
    res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

router.get("/location", authenticateToken, async (req, res) => {
  try {
    const user = await Users.findOne({ name: req.user.username });

    if (!user) return res.status(404).send("User not found");

    res.json({ location: user.location });
  } catch (err) {
    console.error("Error getting location:", err);
    res.status(500).send("Server error");
  }
});

router.get("/filters", authenticateToken, async (req, res) => {
  try {
    const user = await Users.findOne({ name: req.user.username });

    if (!user) return res.status(404).send("User not found");

    res.json({ filters: user.filters });
  } catch (err) {
    console.error("Error getting filters:", err);
    res.status(500).send("Server error");
  }
});

router.patch("/filters", authenticateToken, async (req, res) => {
  try {
    const { filters } = req.body;

    const user = await Users.findOneAndUpdate(
      { name: req.user.username },
      { filters },
      { new: true },
    );

    if (!user) return res.status(404).send("User not found");

    res.json({
      message: "Filters updated successfully",
      filters: user.filters,
    });
  } catch (err) {
    console.error("Error updating filters:", err);
    res.status(500).send("Server error");
  }
});

router.patch("/location", authenticateToken, async (req, res) => {
  try {
    const { location } = req.body;

    // Update the user's location
    const user = await Users.findOneAndUpdate(
      { name: req.user.username },
      { location },
      { new: true },
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({
      message: "Location updated successfully",
      location: user.location,
    });
  } catch (err) {
    console.error("Error updating location:", err);
    res.status(500).send("Server error");
  }
});

export default router;
