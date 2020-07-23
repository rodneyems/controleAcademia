const fs = require("fs")
const data = require("../data.json")
const { idade, date } = require("../utils.js")
const { options } = require("../routes")


// Funcao Index
exports.index = function(req, res){
    return res.render("instrutores/index", {instrutores: data.instrutores})
}

// Create
exports.create = function(req, res){
    return res.render("instrutores/create.njk")
}

// Funcao Show
exports.show = function(req, res){
    const { id } = req.params
    const foundinstructors = data.instrutores.find(function(instrutores){
        return id == instrutores.id
    })
    if (!foundinstructors) return res.send("Instrutor não encontrado")

    const instrutorEstilizado = {
        ...foundinstructors,
        nascimento: idade(foundinstructors.nascimento),
        desde: new Intl.DateTimeFormat("pt-BR").format(foundinstructors.desde),
    }

    
    return res.render("../views/instrutores/show.njk", { instrutor: instrutorEstilizado })
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
    const lastId = data.instrutores[data.instrutores.length -1]

    if (lastId){
        id = lastId.id + 1
    }
 
    data.instrutores.push({
        id,
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
        return res.redirect("/instrutores/create")
}

// Funcao Edit
exports.edit = function (req, res){
    const { id } = req.params
    const foundinstructors = data.instrutores.find(function(instrutores){
        return id == instrutores.id
    })
    if (!foundinstructors) return res.send("Instrutor não encontrado")

    const instrutorEstilizado = {
        ...foundinstructors,
        nascimento: date(foundinstructors.nascimento),
        desde: new Intl.DateTimeFormat("pt-BR").format(foundinstructors.desde)
    }
 
    return res.render("../views/instrutores/edit.njk", { instrutor: instrutorEstilizado })
}

// Funcao Edit
exports.put = function (req, res){
    const { id } = req.body
    let index = 0
    const foundinstructors = data.instrutores.find(function(instrutores,foundIndex){
        if ( id == instrutores.id ){
            index = foundIndex
            return true
        }
    })
    if (!foundinstructors) return res.send("Instrutor não encontrado")

    let nascimento = Date.parse(req.body.nascimento)
    const instrutorEstilizado = {
        ...foundinstructors,
        ...req.body,
        nascimento,
        id: Number(req.body.id)
    }
    
 
    data.instrutores[index] = instrutorEstilizado

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha de escrita")
    })
        return res.redirect(`/instrutores/${id}`)
}

// Funcao Delete
exports.delete = function(req, res){
    const { id } = req.body
    const filteredInstructors = data.instrutores.filter(function(instrutor){
        return instrutor.id != id
    })
    data.instrutores = filteredInstructors
    
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha de escrita")
    })
        return res.redirect(`/instrutores/${id}`)
}