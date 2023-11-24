//Modulo Mongoose

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
  public_titulo: { type: String, require: true },
  public_descripcion: { type: String, require: true },
  public_calorias: { type: Number, require: false, default: 0 },
  public_borrador: { type: Boolean, require: false, default: 0 },
  public_activo: { type: Boolean, require: false, default: 1 },
  public_like: { type: Number, require: false, default: 0 },
  public_imagenes: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Imagenp',
      
    },
  ],
  public_user: { type: Schema.Types.ObjectId, ref: 'Usuario', require: true },
});

//Creo el modelo de publicacion
const Publicaciones = mongoose.model('Publicacion', PublicacionSchema);
//Lo exportamos
module.exports = Publicaciones;
