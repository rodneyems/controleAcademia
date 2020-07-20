module.exports = {
    idade: function (timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let idade = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        const day = today.getDate() - birthDate.getDate()

        if ( month <= 0 && day < 1 ) {
            idade = idade - 1
        }
        return idade
    }
}