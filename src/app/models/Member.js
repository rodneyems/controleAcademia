const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all(callback){
        db.query('SELECT * FROM members', function(err, results){
            if (err) return res.send("Falha na escrita dos dados, tente novamente.")
            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO members(
                name,
                avatar_url,
                gender,
                services,
                birth,
                member_at
            ) VALUES($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

       
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]
        console.log(values)
        
        db.query(query, values, function(err, results){
            if (err) throw `Falha na escrita dos dados, tente novamente. ${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query('SELECT * FROM members WHERE id = $1',[id], function(err, results){
            if (err) throw `Falha na escrita dos dados, tente novamente. ${err}`
            console.log(results.rows[0])
            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE members SET
            name = ($1),
            avatar_url = ($2),
            gender = ($3),
            services = ($4),
            birth = ($5)
            WHERE id = ($6)
    `
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            data.id
        ]
        console.log(data.services)
        db.query(query, values, (err, results)=>{
            if (err) throw `Falha na escrita dos dados, tente novamente. ${err}`
            return callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM members WHERE id = $1`, [id], (err, results)=>{
            if (err) throw `Falha na escrita dos dados, tente novamente. ${err}`
            return callback()
        })
    }
}