const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// ================= GENERATE TOKEN =================
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      personType: user.personType
    },
    process.env.JWT_SECRET || "supersecret",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    }
  );
};

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    let { name, email, password, personType } = req.body;

    // Validation
    if (!name || !email || !password || !personType) {
      return res.status(400).json({
        message: "Please provide name, email, password and personType"
      });
    }

    email = email.toLowerCase().trim();
    password = password.trim();

    const allowedRoles = ["user", "doctor", "admin"];
    if (!allowedRoles.includes(personType)) {
      return res.status(400).json({
        message: "Invalid personType"
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password, // لازم يكون عندك hash في model
      personType
    });

    // لو Doctor → نعمل profile
    if (personType === "doctor") {
      await Doctor.create({
        user: newUser._id
      });
    }

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        personType: newUser.personType
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password"
      });
    }

    email = email.toLowerCase().trim();
    password = password.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        personType: user.personType
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};