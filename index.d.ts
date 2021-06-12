declare function jhshop(argumentos: jhshop.mysqlarguments): jhshop.Mysql

declare namespace jhshop {

    interface mysqlarguments {
        host: string
        port?: number
        user: string
        password: string
        database: string
    }

    class Mysql{
        getUser(nick: string): Promise<string>
    }
}

export = jhshop