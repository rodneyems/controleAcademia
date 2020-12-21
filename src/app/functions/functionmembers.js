const Member = require("../models/Member")
const { date, servicesList } = require("../../lib/utils.js")

module.exports = {
    index(req, res){
        Member.all((members)=>{
        for (member of members){
            servicesList(member)
        }
        return res.render("members/index",{ members })
        })  
    },
    create(req, res){
        return res.render("members/create.njk")
    },
    post(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }

        Member.create(req.body, Member=>{
            return res.redirect(`/members/${Member.id}`)
        })
    },
    show(req, res){
        Member.find(req.params.id, member=>{
            if (!member) return res.send("member não encontrado")
            member.birth = date(member.birth).birthDay
            member.desde = date(member.member_at).format
            member.services = servicesList(member)
            return res.render("members/show",{member})
        })
    },
    edit(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }
        Member.find(req.params.id, members=>{
            if (!members) return res.send("Membro não encontrado")
            members.birth = date(members.birth).iso
            members.desde = date(members.members_at).format
            members.services = servicesList(members)
            return res.render("members/edit",{members})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        for ( key of keys ){
            if ( req.body[key] == "" ){
                return res.send("Preencha todos os Campos")
            }
        }
        Member.update(req.body, ()=>{
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res){
        Member.delete(req.body.id, ()=>{
            return res.redirect("/members")
        })
    }
}
