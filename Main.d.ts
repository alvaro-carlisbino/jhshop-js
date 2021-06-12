declare function jhshop(argumentos: jhshop.mysqlarguments): jhshop.Mysql

declare namespace jhshop {
    interface mysqlarguments {
        host: string
        port?: number
        user: string
        password: string
        database: string
    }

    interface jogador {
        Nome: string
        Cash: number
    }

    export class Mysql {
        getUser(nick: string): Promise<jogador | undefined>
    }
}

export = jhshop