import * as nconf from "nconf";
import { CorsOptions } from "cors";
import { IHelmetConfiguration } from "helmet";

/**
 * General Server Configuration
 */
export interface IServerConfig {
    /**
     * Options to be used for cors header
     */
    cors?: CorsOptions;
    /**
     * Helmet configuration
     */
    helmet?: IHelmetConfiguration;
    /**
     * port to run on
     */
    port: number;
    /**
     * endpoint to query data from
     */
    endpoint: string;
}

export class Config {
    private static sNconf: nconf.Provider;
    private static get nconf(): nconf.Provider {
        if (Config.sNconf) {
            return Config.sNconf;
        }
        Config.sNconf = new nconf.Provider({})
            .file("config.json")
            .argv({
                e: {
                    alias: "endpoint",
                    demand: true,
                    describe: "the endpoint to use",
                },
                p: {
                    alias: "port",
                    describe: "the port to run on",
                },
            }).defaults({
                endpoint: undefined,
                port: 3000,
            });
        // const parsedUrl = URL.parse(Config.sNconf.get("endpoint"));
        return Config.sNconf;
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
