const mysql = require("mysql")

module.exports = class Connection {
    constructor(argumentos) {
        if (!argumentos) {
            return new Error("Argumentos inválidos!")
        }
        this.argumentos = argumentos
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
        if (!nick) return new Error("Falta de Argumentos!")
        if (typeof nick != "string") return new Error("Argumento Inválido!")
        return new Promise((res, rej) => {
            this.conn.query(`SELECT * FROM Jogadores`, (error, results, fields) => {
                if (error) throw error
                let player = results.find(f => f.Nome == nick)
                if (player) {
                    res({
                        nick: player.Nome,
                        cash: player.Cash
                    })
                } else {
                    res(undefined)
                }
            })
        })
    }
}