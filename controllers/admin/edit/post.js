const Article = require('../../../models/article/Article');

module.exports = async (req, res) => {

    await Article.editArticle(req.body, (response) => {
        if(response.error) {
            return res.status(400).send({success: false, response:"Article edit failed"});
        }
        else {
            return res.status(200).send({success: true, response:"Article edited successfully"});
        }
    });
}

