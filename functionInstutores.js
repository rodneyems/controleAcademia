const fs = require("fs")
const data = require("./data.json")
const { idade } = require("./utils.js")
const { options } = require("./routes")

exports.show = function(req, res){
    const { id } = req.params
    const foundinstructors = data.instrutores.find(function(instrutores){
        return id == instrutores.id
    })
    if (!foundinstructors) return res.send("Instrutor não encontrado")

    const instrutorEstilizado = {
        ...foundinstructors,
        nascimento: idade(foundinstructors.nascimento),
        desde: new Intl.DateTimeFormat("pt-BR").format(1594896738870)
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
    const id = Number(data.instrutores.length + 1)
 
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
