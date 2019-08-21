require ('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
app.use(bodyParser.json())


//importamos las rutas get,post, put, delete
app.use(require('./rutas/usuario'));


mongoose.connect('mongodb://localhost:27017/Cafe-de-olla', {useNewUrlParser: true}, (err) => {
    if(err) throw err;

    console.log('Base de datos CONECTADA');
});


app.listen(process.argv.PORT, () => {
    console.log('Escuchando peticiones en el puerto 3000');
})
