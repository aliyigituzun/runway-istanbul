const Article = require('../../../models/article/Article');

module.exports = async (req, res) => {
    console.log("buradayix");
    await Article.findById(req.params.id)
    .then(article => {
        if(article)
        res.render('article/article', {
            title: article.name + ' | Runway Istanbul',
            page: 'index/article',
            includes: {
            external: {
                css: ['general', 'index', 'fontawesome', 'page', 'header', 'article'],
                js: ['page', 'header', 'index', 'navbar', 'serverRequest']
            }
        },
        url: '/article/' + req.params.id,
        article: article,
        lang: req.cookies['lang']
        });
    });
};