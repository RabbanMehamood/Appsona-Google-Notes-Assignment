const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, config.get('jwtsecret'), { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
