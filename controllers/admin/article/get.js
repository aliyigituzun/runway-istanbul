module.exports =  (req, res) => {
    res.render('admin/article', {
        title: 'Article Management',
        page: 'admin/article',
        includes: {
            external: {
                css: ['page', 'index', 'header', 'admin', 'general', 'article'],
                js: ['page', 'index', 'header', 'admin', 'serverRequest']
            }
        },
        url: '/admin/article',
    });
}

