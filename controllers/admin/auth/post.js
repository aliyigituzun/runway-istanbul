const express = require('express');
const app = express();

module.exports = (req, res) => {
    
    const { password } = req.body;
    console.log("bay kemal")
    console.log(password);
    if (String(password) == process.env.ADMIN_PASSWORD) {
        // Authentication successful
        console.log("başarili gülüm")
        req.session.ADMIN_PASSWORD = req.body.ADMIN_PASSWORD;
        res.status(200).send({success: true, response:"Authentication successful"});
    } else {
        // Authentication failed
        res.status(401).send({success: false, response:"Authentication failed"});
    }
    
}