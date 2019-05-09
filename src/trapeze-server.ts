import { createTrapezeApiRoute } from "@donmahallem/trapeze-api-express-route";
import * as express from "express";
import * as helmet from "helmet";
import { Server } from "http";
import { resolve as pathResolve } from "path";
import { IServerConfig } from "./config";
export const api404Handler: express.RequestHandler = (req: express.Request,
    res: express.Response,
    next: express.NextFunction): void => {
    res.status(404).json({
        statusCode: 404,
    });
};
export const serverErrorHandler: express.ErrorRequestHandler = (err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    // tslint:disable-next-line:no-console
    console.error(err);
    res.status(500).json({ error: true });
};
export class TrapezeServer {
    private app: express.Application;
    private server: Server;
    private readonly ngModulePath: string = pathResolve(__dirname +
        "./../node_modules/@donmahallem/trapeze-client-ng/dist/trapeze-client-ng");
    constructor(public readonly config: IServerConfig) {
        this.app = express();
        if (config.helmet) {
            this.app.use(helmet(config.helmet));
        }
        this.app.use("/api", createTrapezeApiRoute(config.endpoint));
        this.app.use("/api", api404Handler);
        this.app.use(express.static(this.ngModulePath));
        this.app.get("/*", (req, res) => {
            res.status(404).sendFile(this.ngModulePath + "/index.html");
        });
        this.app.use(serverErrorHandler);
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.server = this.app.listen(this.config.port, (err?: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    }

    public stop() {
        this.server.close((err) => {
            // tslint:disable-next-line:no-console
            console.log("Server closed", err);
        });
    }
}
