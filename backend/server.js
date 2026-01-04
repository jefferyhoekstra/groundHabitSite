// INITIALIZATION
const express = require("express");
const server = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DB_URI, JWT_SECRET } = process.env;
const User = require("./models/user");
const Post = require("./models/post");

// AUTH
const getTokenFromRequest = (request) => {
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim();
  }

  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) return "";

  const cookie = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("jwt-authorization="));

  if (!cookie) return "";
  return decodeURIComponent(cookie.split("=").slice(1).join("="));
};

const requireAuth = (request, response, next) => {
  const token = getTokenFromRequest(request);
  if (!token) return response.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).send("Invalid token");
  }
};

// MIDDLEWARE
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// DATABASE CONNECTION
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer is runing on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// PATHS
server.get("/", (request, response) => {
  response.send("LIVE!");
});

// LOGIN PATH
server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const jwtToken = jwt.sign({ id: username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  try {
    await User.findOne({ username }).then(async (result) => {
      if (result) {
        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
          response.send({ message: "Login successful", token: jwtToken });
        } else {
          response.send({ message: "Invalid credentials" });
        }
      } else {
        response.send({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

// REGISTER PATH
server.post("/register", async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  try {
    await user.save().then((result) => response.status(201).send("User added"));
  } catch (error) {
    if (error.code === 11000) {
      response.send("Username already exists");
    } else {
      response.send("An error occurred");
    }
    // console.log(error.message);
  }
});

// GET POSTS PATH
server.get("/posts", async (request, response) => {
  try {
    await Post.find().then((result) => response.status(200).send(result));
  } catch (error) {
    console.log(error.message);
  }
});

// ADD POSTS PATH
server.post("/add-post", requireAuth, async (request, response) => {
  const { title, text } = request.body;
  const post = new Post({
    author: request.user.id,
    title,
    text,
  });

  try {
    await post.save().then((result) => response.status(201).send("Post added"));
  } catch (error) {
    console.log(error.message);
  }
});
