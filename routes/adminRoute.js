const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

const adminAuthGetController = require('../controllers/admin/auth/get');
const adminIndexGetController = require('../controllers/admin/index/get');
const adminArticleGetController = require('../controllers/admin/article/get');

const adminAuthPostController = require('../controllers/admin/auth/post');
const adminArticlePostController = require('../controllers/admin/article/post');
const adminArticleDeletePostController = require('../controllers/admin/delete/post');

router.get('/',
    //isAdmin,
    adminIndexGetController
);
router.get('/auth', 
    adminAuthGetController
);
router.get('/article',
    //isAdmin,
    adminArticleGetController
);

router.post('/auth',
    adminAuthPostController
);
router.post('/article',
    adminArticlePostController
);
router.post('/delete/:id',
    //isAdmin,
    adminArticleDeletePostController
);

module.exports = router;

