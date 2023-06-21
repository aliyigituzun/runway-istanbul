module.exports = (req, res) => {

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
    });
    
};