const express = require('express')
const routes = express.Router()
const functionInst = require("./functionInstutores.js")

/* ====== ROUTES ====== */

routes.get('/', function(req, res){
    return res.redirect("/instrutores")
})

routes.get('/instrutores', function(req, res){
    return res.render("instrutores/index")
})

routes.get('/instrutores/create', function(req, res){
    return res.render("instrutores/create.njk")
})

routes.get('/instrutores/:id', functionInst.show)

routes.post('/instrutores', functionInst.post)

routes.get('/instrutores/:id/edit', functionInst.edit)

routes.get('/membros', function(req, res){
    return res.send("membros")
})

routes.put('/instrutores', functionInst.put)

module.exports = routes
