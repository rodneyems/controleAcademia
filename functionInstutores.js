const fs = require("fs")
const data = require("./data.json")

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
        return res.redirect("/instrutores/create.njk")
}
