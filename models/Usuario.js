//Modulo mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  user_nombre: { type: String, require: true },
  user_ape_pat: { type: String, require: true },
  user_ape_mat: { type: String, require: true },
  user_correo: { type: String, require: true },
  user_contra: { type: String, require: true },
  user_edad: { type: Number, require: true },
  user_peso: { type: Number, require: true },
  user_estatura: { type: Number, require: true },
  user_imagen: { type: String, require: true },
  user_nickname: { type: String, require: true },
  user_publicacion: [
    {
      publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion',
      },
    },
  ],
  user_likes: [
    {
      like: {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    },
  ],
});

// Creo modelo de usuario
const Usuarios = mongoose.model('Usuario', UsuarioSchema);
//Lo exporto
module.exports = Usuarios;
