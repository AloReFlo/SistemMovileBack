const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario');

router.post('/usuario/login', usuario.login);
router.get('/usuario/:id', usuario.get);
router.get('/usuario/', usuario.list);
router.post('/usuario', usuario.create);
router.put('/usuario/:id', usuario.update);
router.delete('/usuario/:id', usuario.delete);

module.exports = router;