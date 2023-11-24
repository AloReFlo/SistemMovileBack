//Traigo mis modelos
const Usuarios = require('../models/Usuario');

const Usuario = {
  //------------------------ AQUI TENGO TODAS MIS ACCIONES -----------------------
  login: async (req, res) => {
    const user = new Usuarios(req.body); // Pido el body al request (basicamente el body es el JSON que envian)
    try {
      const isUser = await Usuarios.findOne({
        user_correo: user.user_correo,
        user_contra: user.user_contra,
      }); // Busco primeramente si hay un usuario con el mismo correo
      if (!isUser) {
        res.status(403).send('No hay usuarios con esas credenciales'); // Si es nulo significa que no trajo nada y por lo tanto se equivoco el usuario
      } else {
        res.status(200).send(isUser._id); // Regreso mi usuario
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  create: async (req, res) => {
    //Pongo la informacion recibida en user
    const user = new Usuarios(req.body);
    try {
      //busco el email para validar que no exista otro igual
      const isUser = await Usuarios.findOne({ user_correo: user.user_correo });
      if (isUser) {
        //Si encontro el email
        return res.status(403).send('Email ya existente');
      }

      await user.save(); //lo guardo
      res.status(201).send(user.id);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const user = await Usuarios.findOne({ _id: id });

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Actualiza los campos del usuario con los valores del body
    Object.assign(user, req.body);

    await user.save(); // Guarda los cambios en el usuario actualizado

    res.sendStatus(204);
  },

  delete: async (req, res) => {

    try{

      const { id } = req.params;
      await Usuarios.deleteOne({ _id: id }); // Encuetro por id y lo borro
      res.sendStatus(204);
    }catch(err){
      res.status(500).send(err.message);
    }
  },

  list: async (req, res) => {
    try{

      const users = await Usuarios.find()
      
      res.status(200).send(users)

    }catch(err){
      res.status(500).send(err.message);
    }
  },

  //Obtener todos los datos del usuario
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Usuarios.findOne({ _id: id })
        .populate('user_publicacion.publicacion') //para mis publicacion
        .populate('user_likes.like'); //para mis likes creo...? Sip es para los likes

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = Usuario;
