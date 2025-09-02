const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /signup
// @access  Public
const registerUser = async (req, res) => {
  const {email, password, name} = req.body;

  try {
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({msg: "User already exists"});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user = new User({email, password: passwordHash, name});
    await user.save();

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({msg: err});
  }
};

// @desc    Login user
// @route   POST /signin
// @access  Public
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({msg: e});
  }
};


module.exports = {registerUser, signin};
