import { createTrapezeApiRoute } from "@donmahallem/trapeze-api-express-route";
import * as express from "express";
import { Config } from "./config";
const app: express.Application = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api", createTrapezeApiRoute(Config.endpoint));
app.use(express.static("./../dist/static"));

app.listen(Config.port, () => {
    // tslint:disable-next-line:no-console
    console.log("Example app listening on port " + Config.port + ' with endpoint "' + Config.endpoint + '"!');
});
