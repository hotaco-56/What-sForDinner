import express from "express";
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const user = await Users.find({name : username});
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

  const user = await Users.findOne({name : username});

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

  const user = await Users.exists({name : username});

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
        }
      ];

      console.log(new_user);

      await Users.create(new_user);

      console.log("JWT: ", token);
      return res.status(201).send(token);        
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
