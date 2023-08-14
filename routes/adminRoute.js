const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');

const adminAuthGetController = require('../controllers/admin/auth/get');
const adminIndexGetController = require('../controllers/admin/index/get');

const adminAuthPostController = require('../controllers/admin/auth/post');


router.get('/auth', 
    adminAuthGetController
);
router.get('',
    isAdmin, 
    adminIndexGetController
);

router.post('/auth',
    adminAuthPostController
);



module.exports = router;

