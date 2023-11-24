//Traigo mis modelos

const Imagenesp = require('../models/ImagenP');
const Publicaciones = require('../models/Publicacion');

const Imagenp = {
  create: async (req, res) => {
    const { publicacion, image } = req.body;
    const imagen = new Imagenesp(req.body);
    try {

        //Se guarda
        await imagen.save();
        
        //Aqui encuentra el id de la publicación y actualiza la información en la tabla de publicacion
        await Publicaciones.findByIdAndUpdate(publicacion, {
          //Aqui hace un push insertando el id que le dimos imagen a public_imagenes(esta pertenece a la tabla de publicacion)
          $push: { public_imagenes: imagen._id },
        });
          
        res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

   //Borra la imagen
   delete: async (req, res) => {
    
    const imagen = new Imagenesp(req.body);

    try {

        //Se borra
        await Imagenesp.deleteOne(imagen._id);

        //Aqui encuentra el id de la publicación y actualiza la información en la tabla de publicacion
        await Publicaciones.findByIdAndUpdate(imagen.publicacion, {
          //Aqui hace un pull quitando el id que le dimos imagen a public_imagenes(esta pertenece a la tabla de publicacion)
          $pull: { public_imagenes: imagen._id },
        });

        res.sendStatus(204);

    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  //Obtener todas las imagenes de una publicación
  getImagenesPublic: async (req, res) => {
    const { id, publicId } = req.params;
    try {
      const imagenes = await Imagenesp.find({publicacion: publicId})

      res.status(200).send(imagenes);

    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = Imagenp;
