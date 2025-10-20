const User = require('../models/userModel');

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Thiếu thông tin bắt buộc!' });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: 'Username hoặc Email đã tồn tại.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllUsers, createUser };
