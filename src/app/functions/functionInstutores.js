const { idade, date } = require("../../lib/utils.js")
const db = require("../../config/db.js")

module.exports = {
    index(req, res){
        db.query('SELECT * FROM instructors', function(err, results){
            if (err) return res.send("Falha na escrita dos dados, tente novamente.")
            return res.render("instrutores/index",{instrutores:results.rows})
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
        
        const query = `
            INSERT INTO instructors(
                name,
                avatar_url,
                gender,
                services,
                birth,
                member_at
            ) VALUES($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const serviceString = ()=>{
            services = ""
            for (service of req.body.services){
                services += " , " + service
            }
            return services.replace(", ", "")
        }
        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            serviceString(),
            date(req.body.birth),
            date(Date.now())
        ]
        
        db.query(query, values, function(err, results){
            if (err) return res.send("Falha na escrita dos dados, tente novamente.")
            
            return res.redirect(`/instructors/${results.rows[0].id}`)
        })

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
