const express = require('express');
const router = express.Router();

const imagenp = require('../controllers/imagenp')

router.post('/imagenp', imagenp.create);
router.delete('/imagenp/:id', imagenp.delete);

module.exports = router;
