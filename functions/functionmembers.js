const fs = require("fs")
const data = require("../data.json")
const { idade, date } = require("../utils.js")
const { options } = require("../routes")


// Funcao Index
exports.index = function(req, res){
    return res.render("membros/index", {membros: data.membros})
}

// Create
exports.create = function(req, res){
    return res.render("membros/create.njk")
}

// Funcao Show
exports.show = function(req, res){
    const { id } = req.params
    const foundmembers = data.membros.find(function(membros){
        return id == membros.id
    })
    if (!foundmembers) return res.send("Membro não encontrado")

    const memberEstilizado = {
        ...foundmembers,
        nascimento: idade(foundmembers.nascimento),
        desde: new Intl.DateTimeFormat("pt-BR").format(foundmembers.desde),
    }

    return res.render("../views/membros/show.njk", { membro: memberEstilizado })
}

// Funcao Post
exports.post = function(req, res){
    
    const keys = Object.keys(req.body)
    for ( key of keys ){
        if ( req.body[key] == "" ){
            return res.send("Preencha todos os Campos")
        }
    }

    let { avatar_url, name, sexo, area } = req.body

    let nascimento = Date.parse(req.body.nascimento)
    let desde = Date.now(req.body)
    let id = 1
    const lastId = data.membros[data.membros.length -1]

    if (lastId){
        id = lastId.id + 1
    }
 
    data.membros.push({
        id: id,
        avatar_url,
        name,
        nascimento,
        sexo,
        area,
        desde
    })

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha de escrita")
    })
        return res.redirect("/membros/create")
}

// Funcao Edit
exports.edit = function (req, res){
    const { id } = req.params
    const foundMembers = data.membros.find(function(membros){
        return id == membros.id
    })
    if (!foundMembers) return res.send("Membro não encontrado")

    const membroEstilizado = {
        ...foundMembers,
        nascimento: date(foundMembers.nascimento),
        desde: new Intl.DateTimeFormat("pt-BR").format(foundMembers.desde)
    }
 
    return res.render("../views/membros/edit.njk", { membros: membroEstilizado })
}

// Funcao PUT
exports.put = function (req, res){
    const { id } = req.body
    let index = 0
    const foundMembers = data.membros.find(function(membros,foundIndex){
        if ( id == membros.id ){
            index = foundIndex
            return true
        }
    })
    if (!foundMembers) return res.send("Membro não encontrado")

    let nascimento = Date.parse(req.body.nascimento)
    const membrosEstilizado = {
        ...foundMembers,
        ...req.body,
        nascimento,
        id: Number(req.body.id)
    }
    
 
    data.membros[index] = membrosEstilizado

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha de escrita")
    })
        return res.redirect(`/membros/${id}`)
}

// Funcao Delete
exports.delete = function(req, res){
    const { id } = req.body
const filteredMembers = data.membros.filter(function(membro){
        return membro.id != id
    })
    data.membros = filteredMembers
    
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha de escrita")
    })
        return res.redirect(`/membros/${id}`)
}