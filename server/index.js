const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected with MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input data
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await UserModel.create({ name, email, password: hash });

        res.json({ status: "OK", user });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
