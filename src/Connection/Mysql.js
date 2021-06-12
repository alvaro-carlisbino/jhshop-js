const mysql = require("mysql")

module.exports = class Connection{
    constructor(argumentos){
        if(!argumentos){
            return new Error("Argumentos inválidos!")
        }
        let {host, port, user, password, database} = argumentos
        
        if(!host || !port || !user || !password || !database){
            return new Error(`Faltam argumentos para a inicialização do MySql`)
        }

        if(typeof host != "string" || typeof port != "number" || typeof user != "string" || typeof database != "string"){
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
            if(err) throw err;
            console.log(`[JH_Shop-JS] Mysql Conectado com sucesso!`)
        })
    }

    async getUser(nick) {
        return nick;
    }
}