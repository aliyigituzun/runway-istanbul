//get script for admin auth script 

module.exports = function (req, res) {
    res.render('admin/auth', {
        title: 'Admin Auth',
        page: 'admin/auth',
        includes: {
            external: {
                css: ['page', 'index', 'header', 'admin', 'general'],
                js: ['page', 'index', 'header', 'auth', 'serverRequest']
            }
        },
        url: '/',
    });
    
}
