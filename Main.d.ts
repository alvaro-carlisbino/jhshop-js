declare function jhshop(argumentos: jhshop.mysqlarguments): jhshop.Client;

declare namespace jhshop {
    interface mysqlarguments {
        host: string
        port?: number
        user: string
        password: string
        database: string
    }

    interface jogador {
        nick: string
        cash: number
    }

    class Client {
        argumentos: mysqlarguments
        getUser(nick: string): Promise<jogador | undefined>;
    }
}

export = jhshop