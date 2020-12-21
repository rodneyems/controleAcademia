const Instructor = require("../models/Instructor")
const { age, date, servicesList } = require("../../lib/utils.js")

module.exports = {
    index(req, res){
        Instructor.all((instrutores)=>{
        for (instrutor of instrutores){
            servicesList(instrutor)
        }
        return res.render("instrutores/index",{ instrutores })
        })  
    },
    create(req, res){
        return res.render("instrutores/create.njk")
    },
    post(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }

        Instructor.create(req.body, instructor=>{
            return res.redirect(`/instrutores/${instructor.id}`)
        })
    },
    show(req, res){
        Instructor.find(req.params.id, instrutor=>{
            if (!instrutor) return res.send("Instrutor não encontrado")
            instrutor.birth = age(instrutor.birth)
            instrutor.desde = date(instrutor.member_at).format
            instrutor.services = servicesList(instrutor)
            return res.render("instrutores/show",{instrutor})
        })
    },
    edit(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }
        Instructor.find(req.params.id, instrutor=>{
            if (!instrutor) return res.send("Instrutor não encontrado")
            instrutor.birth = date(instrutor.birth).iso
            instrutor.desde = date(instrutor.member_at).format
            instrutor.services = servicesList(instrutor)
            return res.render("instrutores/edit",{instrutor})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }
        Instructor.update(req.body, ()=>{
            return res.redirect(`/instrutores/${req.body.id}`)
        })
    },
    delete(req, res){
        Instructor.delete(req.body.id, ()=>{
            return res.redirect("/instrutores")
        })
    }
}
