// Mis modulos de terceros
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Guardo mis rutas

const usuarioRoutes = require('./routes/usuario');
const publicacionRoutes = require('./routes/publicacion');
const likeRoutes = require('./routes/like');
const imagenpRoutes = require('./routes/imagenp');

// Creo mi aplicación express
const app = express();
app.use(cors());

//Especifico el puerto a utilizar
const port = process.env.PORT || 3000;

// Especifico que express use JSON para el body
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
//app.use(express.json())
// Agrego mis rutas para crear los endpoints de las entidades

app.use('/api', usuarioRoutes);
app.use('/api', publicacionRoutes);
app.use('/api', likeRoutes);
app.use('/api', imagenpRoutes);

mongoose.set('strictQuery', false);
//Conexión a mongoose
mongoose.connect(
  'mongodb+srv://AllenWARF:sDIYsPLuj7SMn0lJ@sistemasmoviles.wxlkndj.mongodb.net/?retryWrites=true&w=majority'
);

// Cualquier otra ruta que no este definida arroja un status 404 page not found
app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe');
});

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto: ', port);
});
