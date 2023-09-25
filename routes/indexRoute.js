const express = require('express');
const router = express.Router();

const indexGetController = require('../controllers/index/index/get');
const articleGetController = require('../controllers/index/article/get');

router.get('/', 
    indexGetController
    );
router.get('/article/:id', 
    articleGetController
    );

// router.get('/about', 
//     aboutGetControlller
// );

module.exports = router;

