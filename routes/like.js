const express = require('express');
const router = express.Router();

const like = require('../controllers/like');

router.get('/like/:id', like.get);
router.post('/like', like.create);

module.exports = router;
