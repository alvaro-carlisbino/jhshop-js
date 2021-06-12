const mysql = require("mysql")

module.exports = class Connection {
    constructor(argumentos) {
        if (!argumentos) {
            return new Error("Argumentos inválidos!")
        }

        let { host, port, user, password, database } = argumentos

        if (!host || !port || !user || !password || !database) {
            return new Error(`Faltam argumentos para a inicialização do MySql`)
        }

        if (typeof host != "string" || typeof port != "number" || typeof user != "string" || typeof database != "string") {
            return new Error(`Argumentos inválidos!`)
        }

        this.conn = mysql.createConnection({
            host: host,
            port: port ? port : 3306,
            user: user,
            password: password,
            database: database
        })

        this.conn.connect((err) => {
            if (err) throw err;
        })
    }

    async getUser(nick) {
        return new Promise(res => {
            if (!this.conn) return new Error("Não consegui me conectar ao MySql")
            if (!nick) return new Error("Falta de Argumentos!")
            if (typeof nick != "string") return new Error("Argumento Inválido!")
            if (this.conn.state == "disconnected") return new Error("Não consegui me conectar ao MySql antes de executar essa função!")
            this.conn.query(`SELECT * FROM Jogadores`, (error, results, fields) => {
                if (error) throw error
                console.log(results)
                let player = results.find(f => f.Nome == nick)
                if (player) {
                    return res(player)
                } else {
                    return res(undefined)
                }
            })
        })
    }
}