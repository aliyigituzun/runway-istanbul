const express = require('express');
const app = express();
const Article = require('../../../models/article/Article');

module.exports = async (req, res) => {
    
    const article = req.body;
    console.log(article);

    await Article.createArticle(article, (response) => {
        if(response.article) {
            return res.status(200).send({success: true, response:"Article created successfully"});
        }
        else {
            return res.status(400).send({success: false, response:"Article creation failed"});
        }
    });

    
    
}