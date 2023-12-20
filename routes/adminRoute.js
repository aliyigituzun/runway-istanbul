const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

const adminAuthGetController = require('../controllers/admin/auth/get');
const adminIndexGetController = require('../controllers/admin/index/get');
const adminArticleGetController = require('../controllers/admin/article/get');
const adminArticleEditGetController = require('../controllers/admin/edit/get');

const adminAuthPostController = require('../controllers/admin/auth/post');
const adminArticlePostController = require('../controllers/admin/article/post');
const adminArticleDeletePostController = require('../controllers/admin/delete/post');
const adminArticleFeaturedPostController = require('../controllers/admin/featured/post');
const adminArticleEditPostController = require('../controllers/admin/edit/post');

router.get('/',
    isAdmin,
    adminIndexGetController
);
router.get('/auth', 
    adminAuthGetController
);
router.get('/article',
    isAdmin,
    adminArticleGetController
);
router.get('/edit/:id',
    isAdmin,
    adminArticleEditGetController
);

router.post('/auth',
    adminAuthPostController
);
router.post('/article',
    isAdmin,
    adminArticlePostController
);
router.post('/delete/:id',
    isAdmin,
    adminArticleDeletePostController
);
router.post('/featured',
    isAdmin,
    adminArticleFeaturedPostController
);
router.post('/edit',
    isAdmin,
    adminArticleEditPostController
);

module.exports = router;

