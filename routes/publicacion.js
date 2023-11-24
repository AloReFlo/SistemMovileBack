const express = require('express');
const router = express.Router();
const publicacion = require('../controllers/publicacion');

router.get('/publicacion/:id', publicacion.getPublicacion); //Listo
router.get('/publicacion/', publicacion.getPublicaciones); //Listo
router.post('/publicacion', publicacion.create);    //Falta que se pueda hacer push de manera correcta
router.put('/publicacion/:id', publicacion.update); //Listo
router.delete('/publicacion/:id', publicacion.delete);  //Listo
router.put('/publicacion/:id/borradores', publicacion.borrador);    //Listo
router.get('/publicacion/:id/publicaciones', publicacion.getPublicacionesUser)
router.get('/publicacion/:id/borradoresUser', publicacion.getBorradoresUser)
router.get('/publicacion/:id/buscar/:ord', publicacion.buscador)


module.exports = router;
