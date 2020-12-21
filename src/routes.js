const express = require('express')
const routes = express.Router()
const functionInst = require("./app/functions/functionInstutores.js")
const functionMember = require("./app/functions/functionMembers.js")

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


routes.get('/members', functionMember.index)
routes.get('/members/create', functionMember.create)
routes.get('/members/:id', functionMember.show)
routes.post('/members', functionMember.post)
routes.get('/members/:id/edit', functionMember.edit)
routes.put('/members', functionMember.put)
routes.delete('/members', functionMember.delete)


module.exports = routes
