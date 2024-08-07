// Import required modules
const express = require('express');
const Blacklist = require('../models/blacklist');
const router = express.Router();

// Controller to checking token expiry
const checkTokenExpiry = async (req, res, next) => {
    const token = req.header("auth-token");
    const isBlacklisted = await Blacklist.findOne({ token: token });
    if (isBlacklisted) return res.status(409).send('Token has expired.');
    res.status(200).send(token);
}

// Controller for black listing token
const blackListToken = async (req, res, next) => {
    const token = req.header("auth-token");
    const blacklistToken = new Blacklist({ token: token });
    const result = await blacklistToken.save();
    res.status(201).send(result);
}

module.exports = { checkTokenExpiry, blackListToken };

