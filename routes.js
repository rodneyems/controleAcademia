const express = require('express')
const routes = express.Router()

/* ====== ROUTES ====== */

routes.get('/', function(req, res){
    return res.redirect("/instrutores/index.njk")
})

routes.get('/instrutores/index.njk', function(req, res){
    return res.render("instrutores/index")
})

routes.get('/membros', function(req, res){
    return res.send("membros")
})


module.exports = routes
