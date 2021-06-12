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
                let player = results.find(f => f.Nome == nick.toLocaleLowerCase())
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

    async setUser(nick, cash) {
        if (!nick || !cash) return new Error("Falta de Argumentos!")
        if (typeof nick != "string" || typeof cash != "number") return new Error("Argumento Inválido!")
        if(cash < 0) return new Error(`Cash deve ter um valor de 0 ou maior!`)
        return new Promise((res, rej) => {
            this.conn.query(`SELECT * FROM Jogadores`, (error, results, fields) => {
                if(error) throw error;
                let player = results.find(f => f.Nome == nick.toLocaleLowerCase())
                if(player) {
                    this.conn.query(`UPDATE Jogadores SET Cash = ${cash} WHERE Nome = '${nick.toLocaleLowerCase()}'`, (errora, resultsa, fieldsa) => {
                        if(errora) throw errora
                        res({
                            nick: nick,
                            cash: cash
                        })
                    })
                }else {
                    return new Error(`Nick inválido!`)
                }
            })
        })
    }

    async top(limit){
        return new Promise((res, rej) => {
            this.conn.query(`SELECT * FROM Jogadores`, (error, results, fields) => {
                if(error) throw error;
                let args = []
                for(let i = 0; i < limit; i++){
                   if(results[i]){
                       args.push({
                           nick: results[i].Nome,
                           cash: results[i].Cash
                       })
                   }
                }
                res(args)
            })
        })
    }
}