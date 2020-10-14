const { idade, date } = require("../../lib/utils.js")
const dv = require("../../config/db.js")
const db = require("../../config/db.js")

module.exports = {
    index(req, res){
        return res.render("membros/index")
    },
    create(req, res){
        return res.render("membros/create.njk")
    },
    post(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }
    
        let { avatar_url, name, sexo, area } = req.body
        return res.send("POST")
    },
    show(req, res){
        return res.send("SHOW")
    },
    edit(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }
    
        return res.send("EDIT")
    },
    delete(req, res){
        return res.send("delete")
    }
}
