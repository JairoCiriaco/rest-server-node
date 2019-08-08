require ('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

 
app.get('/usuario', function (req, res) {
  res.send('Peticion get')
})

app.post('/usuario', function (req, res) {
    let user = req.body;


    res.json({
        user
    })
})

app.put('/usuario', function (req, res) {
   
    let datos = req.body;


    res.json({
        datos
    })
})

app.delete('/usuario', function (req, res) {
    res.send('Peticion delete')
})
 
app.listen(process.argv.PORT, () => {
    console.log('Escuchando peticiones en el puerto 3000');
})
