module.exports =  (req, res) => {
    res.render('admin/index', {
        title: 'Admin',
        page: 'admin/index',
        includes: {
            external: {
                css: ['page', 'index', 'header', 'admin', 'general'],
                js: ['page', 'index', 'header']
            }
        },
        url: '/',
    });
}

