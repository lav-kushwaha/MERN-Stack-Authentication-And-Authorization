const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User");

const app = express();
const PORT = 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS middleware for handling cross-origin requests
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware for parsing cookies in incoming requests
app.use(cookieParser());

// Set Mongoose to strict query mode (optional, depending on your preferences)
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JWT secret key (replace with a secure secret key)
const jwtSecretKey = "your-secret-key";

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

// Middleware to verify user authentication using JWT
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Error with token" });
    }

    if (decoded.role === "admin") {
      next();
    } else {
      return res.status(403).json({ error: "Not admin" });
    }
  });
};

// Route for accessing the dashboard (requires authentication)
app.get("/dashboard", verifyUser, (req, res) => {
  res.json({ status: "Success" });
});

// Route for user registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before storing it
    const hash = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await UserModel.create({ name, email, password: hash });

    res.json({ status: "Success" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Route for user login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await UserModel.findOne({ email });

    if (user) {
      // Compare the hashed password with the provided password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Create a JWT token and set it as a cookie in the response
        const token = jwt.sign(
          { email: user.email, role: user.role },
          jwtSecretKey,
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        res.json({ status: "Success", role: user.role });
        
      } else {
        res.status(401).json({ error: "The password is incorrect" });
      }
    } else {
      res.status(404).json({ error: "No record existed" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
