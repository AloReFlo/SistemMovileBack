//Modulo mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  publicacion: {
    type: Schema.Types.ObjectId,
    ref: 'Publicacion',
    require: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true,
  },
});

// Creo modelo de like
const Likes = mongoose.model('Like', LikeSchema);
//Lo exporto
module.exports = Likes;
