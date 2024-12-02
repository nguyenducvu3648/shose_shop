const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser  = new User({ username, email, password: hashedPassword });
    try {
        await newUser .save();
        res.status(201).json({ message: 'Người dùng đã đăng ký thành công' });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi đăng ký', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Thông tin xác thực không hợp lệ' });
    }
};