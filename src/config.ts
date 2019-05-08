import * as nconf from "nconf";
import * as URL from "url";

export class Config {
    private static _nconf: nconf.Provider;
    private static get nconf(): nconf.Provider {
        if (Config._nconf) {
            return Config._nconf;
        }
        Config._nconf = new nconf.Provider({})
            .file("config.json")
            .argv({
                p: {
                    alias: "port",
                    describe: "the port to run on",
                },
                e: {
                    alias: "endpoint",
                    describe: "the endpoint to use",
                    demand: true,
                },
            }).defaults({
                port: 3000,
                endpoint: undefined,
            });
        const parsedUrl = URL.parse(Config._nconf.get("endpoint"));
        return Config._nconf;
    }

    /**
     * gets the port for the server
     */
    public static get port(): number {
        return Config.nconf.get("port");
    }

    public static get endpoint(): string {
        return Config.nconf.get("endpoint");
    }

}
