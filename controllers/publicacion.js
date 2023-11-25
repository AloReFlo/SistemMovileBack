//Traigo mis modelos
const Usuarios = require('../models/Usuario');
const Publicaciones = require('../models/Publicacion');

const Publicacion = {
  create: async (req, res) => {
    //Pongo la informacion recibida en publicacion
    const { id } = req.params;
    const publicacion = new Publicaciones(req.body);

    try {

      await publicacion.save(); //lo guardo

      const user = await Usuarios.findById(publicacion.public_user)
      user.user_publicacion.push(publicacion.id)

      res.status(201).send(publicacion._id);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicaciones.findOne({ _id: id });

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrado');
    }

    delete req.body.public_imagenes
    // Actualiza los campos de la publicacion con los valores del body
    Object.assign(publicacion, req.body);

    await publicacion.save(); // Guarda los cambios en la publicacion actualizado

    res.sendStatus(200);
  },

  delete: async (req, res) => {
    try{
      const { id } = req.params;
      await Publicaciones.deleteOne({ _id: id }); // Encuetro por id
      res.sendStatus(204);
    }catch(err){
      res.status(500).send(err.message);
    }
 
  },

  //Obtener todos los datos de una publicación
  getPublicacion: async (req, res) => {
    const { id } = req.params;
    try {
      const publicacion = await Publicaciones.findOne({ _id: id })
      .populate({ path: 'public_user', select: 'user_nombre user_imagen'})
      .populate({ path: 'public_imagenes', select: 'image'});

      res.status(200).send(publicacion);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  //Obtener todas las publicaciones
  getPublicaciones: async (req, res) => {
    try {
      const publicaciones = await Publicaciones.find({public_borrador: false})
      .populate({ path: 'public_user', select: 'user_nickname user_imagen'})
      .populate({ path: 'public_imagenes', select: 'image'});

      res.status(200).json({publicaciones});
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  //Obtener todos los borradores de un usuario
  getBorradoresUser: async (req, res) => {
    try {

      const { id } = req.params;

      const publicaciones = await Publicaciones.find({public_user: id, public_borrador: true})
      .populate({ path: 'public_user', select: 'user_nickname'})
      .populate({ path: 'public_imagenes', select: 'image'});
  
      res.status(200).json({publicaciones});
    } catch (err) {
        res.status(500).send(err.message);
    }
  },

    //Obtener todas las publicaciones de un usuario
  getPublicacionesUser: async (req, res) => {
    try {
  
      const { id } = req.params;
  
      const publicaciones = await Publicaciones.find({public_user: id, public_borrador: false})
      //.populate({ path: 'public_user', select: 'user_nickname user_imagen'})
      .populate({ path: 'public_user', select: 'user_nickname'})
      .populate({ path: 'public_imagenes', select: 'image'});
    
      res.status(200).json({publicaciones});
    } catch (err) {
        res.status(500).send(err.message);
    }
 },

  borrador: async (req, res) => {
    const { id } = req.params;
    const publicacion = await Publicaciones.findOne({ _id: id });

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrado');
    }

    // Actualiza los campos de la publicacion con los valores del body
    Object.assign(publicacion, req.body);

    await publicacion.save(); // Guarda los cambios en la publicacion actualizado

    res.sendStatus(200);
  },

  buscador: async (req, res) => {
    try {
      const { id, ord } = req.params;

      var ordenamiento;
      if(ord == "1"){
        ordenamiento = 1
      }else if(ord == "0"){
        ordenamiento = -1
      }

      var regex = new RegExp(id, 'i');
  
      const publicaciones = await Publicaciones.find({ $or: [ { public_titulo: regex }, { public_descripcion: regex}], public_borrador: false})
      .populate({ path: 'public_user', select: 'user_nickname user_imagen'})
      //.populate({ path: 'public_user', select: 'user_nickname'})
      .populate({ path: 'public_imagenes', select: 'image'})
      .sort([
        ['public_titulo', ordenamiento], // Orden ascendente  = 1 , descentente = -1
        ['public_descripcion', ordenamiento] // Si hay coincidencias en public_titulo, ordena ascendente por public_descripcion
      ]);
    
      res.status(200).json({publicaciones});
    } catch (err) {
        res.status(500).send(err.message);
    }
  },

  
};

module.exports = Publicacion;


/*      const publicacionExiste = await Publicaciones.findOne({ _id: id });

      if (publicacionExiste) {
        //Aqui encuentra el id del usuario y actualiza la información en la tabla de publicaciones
        const Publicacion = await Publicaciones.findByIdAndUpdate(
          publicacion._id,
          {
            //Pone a como true de que es un borrador
            public_borrador: 0,
          }
        );

        //Aqui encuentra el id del usuario y actualiza la información en la tabla de usuarios
        await Usuarios.findByIdAndUpdate(publicacion.public_user, {
          //Aqui hace un push insertando el id que se creo de la publicacion a user_publicacion(esta pertenece a la tabla de Usuario)
          $push: { publicacion },
        });

        res.status(201).send('Publicación puesta en borradores correctamente');
      } */