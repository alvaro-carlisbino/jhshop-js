declare function JHShop(argumentos: JHShop.mysqlarguments): JHShop.Client;

declare namespace JHShop {
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
        setUser(nick: string, cash: number): Promise<jogador>;
        top(limit: number): Promise<jogador[]>;
    }
}

export = JHShop