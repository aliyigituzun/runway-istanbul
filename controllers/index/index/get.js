const Article = require('../../../models/article/Article');

module.exports = (req, res) => {
    let type = "";
    if(req.body.type) {
        type = req.body.type;
    }
    else {
        type = null;
    }
    Article.getArticles((articles) => {
        res.render('index/index', {
            title: 'Title',
            page: 'index/index',
            includes: {
                external: {
                    css: ['page', 'index', 'header', 'fontawesome', 'general'],
                    js: ['page', 'index', 'header']
                }
            },
            url: '/',
            articles: articles,
            type: type,
            lang: req.cookies['lang']
        });
    });
    
};