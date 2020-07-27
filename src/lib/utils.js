module.exports = {
    idade(timestamp){
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

        return `${year}-${month}-${day}`
    }
}