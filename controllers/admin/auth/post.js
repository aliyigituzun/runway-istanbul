const express = require('express');
const app = express();

module.exports = (req, res) => {
    
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        // Authentication successful
        res.status(200).send('Authentication successful');
    } else {
        // Authentication failed
        res.status(401).send('Authentication failed');
    }
    
}