//Modulo mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImagenpSchema = new Schema({
  
  publicacion: {
    type: Schema.Types.ObjectId,
    ref: 'Publicacion',
    require: true,
  },

  image: { type: String, require: true }

});

// Creo modelo de like
const Imagenesp = mongoose.model('Imagenp', ImagenpSchema);

//Lo exporto
module.exports = Imagenesp
