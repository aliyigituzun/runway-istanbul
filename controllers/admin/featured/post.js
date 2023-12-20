const express = require('express');
const app = express();
const Article = require('../../../models/article/Article');

module.exports = async (req, res) => {
    

    id = req.body.id;

    await Article.setFeatured(id, (response) => {
        if(response.success) {
            return res.status(200).send({success: true, response:"Set featured successfully"});
        }
        else {
            return res.status(400).send({success: false, response:"Couldn't set featured"});
        }
    });

    
    
}