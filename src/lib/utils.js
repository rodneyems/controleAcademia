module.exports = {
    age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let idade = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        const day = today.getDate() - birthDate.getDate()

        if ( month <= 0 && day < 1 ) {
            idade = idade - 1
        }
        return idade
    },

    date(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    servicesList(instrutor){
        return instrutor.services = instrutor.services.replace(/"/g,"").replace("}","").replace("{","").split(",")

    }

}