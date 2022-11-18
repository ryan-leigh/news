const express = require('express');
const articlesController = require('./controllers/articlesController.js');
const publishersController = require('./controllers/publishersController.js');
const topicsController = require('./controllers/topicsController.js');
const router = express.Router();

router.get('/articles', articlesController);
//router.post('/users');
//router.put('/users/:user_id/subscriptions');
router.get('/publishers', publishersController);
router.get('/topics', topicsController);

module.exports = router;