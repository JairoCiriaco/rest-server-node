const Usuario = require('../modelos/modelo-usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const express = require('express');
const app = express();

 
app.get('/usuario', function (req, res) {

      let desde = req.query.desde || 0;
      desde = Number(desde);

      let limPagina = req.query.limPagina || 5;
      limPagina = Number(limPagina);

    Usuario.find({Estado:true})
                  .skip(desde)
                  .limit(limPagina)
                  .exec((err, usuariosDB) => { 
                         if(err){
                            return res.status(400).json({
                                  ok: false,
                                  err
                               })
                         }
                        
                        Usuario.count({Estado: true}, (err, conteo) => {
                              res.json({
                                    ok: true,
                                    usuariosDB,
                                    cuantos: conteo
                                  })
                        })
                         
                  })
                  




  })
  
app.post('/usuario', function (req, res) {
      let body = req.body; 
  
      //Recibimos los datos del usuario
      let newUser = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
      });


      //Los guardamos en la base de datos (solo mostramos)
      newUser.save((err, usuarioBD) => {
            if(err){
                  return res.status(400).json({
                        ok: false,
                        err
                  })
            }

            res.json({
                  ok: true,
                  usuario: usuarioBD
            })
      })
})
  
app.put('/usuario/:id', function (req, res) {
      let id= req.params.id;
      let datos = _.pick(req.body, ['nombre', 'email', 'role', 'Estado']);

      
      Usuario.findByIdAndUpdate(id, datos, {new: true}, (err, usuarioBD) =>{
            if(err){
                  return res.status(400).json({
                        ok:false,
                        err
                  })
            }

            res.json({
                  ok: true,
                  usuario: usuarioBD
            })
      });
     
})
  
app.delete('/usuario/:id', function (req, res) {
     let id = req.params.id;
     
     let cambiarEstado = {
           Estado: false
     };

     //Usuario.findByIdAndRemove(id, (err, usuarioDelete)=>{
      Usuario.findByIdAndUpdate(id, cambiarEstado, {new: true}, (err, usuarioDelete)=>{
            if(err){
                  return res.status(400).json({
                        ok: false,
                        err
                  })
            }

            if(!usuarioDelete){
                  res.status(400).json({
                        ok: false,
                        err: {
                              message: 'El usuario no existe'
                        }
                  })
            }

            res.json({
                  ok: true,
                  usuarioDelete
            })
     })

})
  

module.exports = app;