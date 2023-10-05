const express = require('express');
const app = express();
const Article = require('../../../models/article/Article');

module.exports = async (req, res) => {
    
    const id = req.params.id;
    await Article.deleteArticle(id, (response) => {
        if(response.success) {
            return res.status(200).send({success: true, response:"Article deleted successfully"});
        }
        else {
            return res.status(400).send({success: false, response:"Article deletion failed"});
        }
    });

    
    
}