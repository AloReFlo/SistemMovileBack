//Traigo mis modelos
const Likes = require('../models/Like');
const Usuarios = require('../models/Usuario');
const Publicaciones = require('../models/Publicacion');

const Like = {
  create: async (req, res) => {
    const { usuario, public } = req.body;

    try {
      // Buscar el usuario por su ID
      const user = await Usuarios.findById(usuario);

      if (!user) {
        res.status(404).send('Usuario no encontrado');
      }

      const likeExiste = await Likes.findOne({
        user: usuario,
        publicacion: public,
      });

      if (likeExiste) {
        //Se borra
        await Likes.deleteOne(likeExiste._id);

        await Usuarios.findByIdAndUpdate(likeExiste.user, {
          //Aqui hace un pull quitando el id que le dimos like a user_likes(esta pertenece a la tabla de Usuario)
          $pull: { user_likes: likeExiste._id },
        });

        //Aqui encuentra el id del usuario y actualiza la información en la tabla de publicaciones
        //const Publicacion = await Publicaciones.findByIdAndUpdate(
        //  like.publicacion,
        //  {
        //Quitara un 1 like en la tabla de publicaciones
        //    public_like: parseInt(public_like - 1),
        // }
        //);

        const publicacion = await Publicaciones.findById(
          likeExiste.publicacion
        );
        publicacion.public_like = publicacion.public_like - 1;
        const publicacionUpdated = await publicacion.save();
        res.status(201).send(publicacionUpdated);
        return;
      }
      //Si no exite tu like se añadira

      //Se guarda
      const like = new Likes({
        user: usuario,
        publicacion: public,
      });
      await like.save();

      //Aqui encuentra el id del usuario y actualiza la información en la tabla de usuarios
      await Usuarios.findByIdAndUpdate(like.user, {
        //Aqui hace un push insertando el id que le dimos like a user_likes(esta pertenece a la tabla de Usuario)
        $push: { user_likes: like._id },
      });

      const publicacion = await Publicaciones.findById(like.publicacion);

      publicacion.public_like = publicacion.public_like + 1;
      const publicacionUpdated = await publicacion.save();

      res.status(201).send(publicacionUpdated);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  //Obtener todos los datos del usuario
  get: async (req, res) => {
    try {
      const likes = await Likes.find();
      res.status(200).send(likes);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = Like;
