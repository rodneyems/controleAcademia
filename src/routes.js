const express = require('express')
const routes = express.Router()
const functionInst = require("./app/functions/functionInstutores.js")
const functionMember = require("./app/functions/functionmembers.js")

/* ====== ROUTES ====== */

routes.get('/', function(req, res){
    return res.redirect("/instrutores")
})

routes.get('/instrutores', functionInst.index)
routes.get('/instrutores/create', functionInst.create)
routes.get('/instrutores/:id', functionInst.show)
routes.post('/instrutores', functionInst.post)
routes.get('/instrutores/:id/edit', functionInst.edit)
routes.put('/instrutores', functionInst.put)
routes.delete('/instrutores', functionInst.delete)


routes.get('/membros', functionMember.index)
routes.get('/membros/create', functionMember.create)
routes.get('/membros/:id', functionMember.show)
routes.post('/membros', functionMember.post)
routes.get('/membros/:id/edit', functionMember.edit)
routes.put('/membros', functionMember.edit)
routes.delete('/membros', functionMember.delete)


module.exports = routes
