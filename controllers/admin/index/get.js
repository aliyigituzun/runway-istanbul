Article = require('../../../models/article/Article');

module.exports =  (req, res) => {
    Article.getArticles((articles) => {
        res.render('admin/index', {
            title: 'Admin',
            page: 'admin/index',
            includes: {
                external: {
                    css: ['page', 'index', 'header', 'admin', 'general'],
                    js: ['page', 'index', 'header', 'admin', 'serverRequest']
                }
            },
            url: '/',
            articles: articles
        });
    })
    
}

