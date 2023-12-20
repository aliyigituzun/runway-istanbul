const Article = require('../../../models/article/Article');

module.exports = async (req, res) => {
    await Article.findById(req.params.id)
    .then(article => {
        if(article) {
            res.render('admin/edit', {
                title: 'Edit Article',
                page: 'admin/edit',
                includes: {
                    external: {
                        css: ['page', 'index', 'header', 'admin', 'general', 'article', 'edit'],
                        js: ['page', 'index', 'header', 'admin', 'edit', 'serverRequest']
                    }
                },
                url: '/admin/edit',
                article: article
            });
        }
        else {
            res.redirect('/admin/article');
        }
    });
}

