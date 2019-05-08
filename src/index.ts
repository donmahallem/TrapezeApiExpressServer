import * as express from 'express';
import { Config } from './config';
import { createTrapezeApiRoute } from "@donmahallem/trapeze-api-express-route";
const app: express.Application = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', createTrapezeApiRoute(Config.endpoint))
app.use(express.static('./../dist/static'));

app.listen(Config.port, function () {
    console.log('Example app listening on port ' + Config.port + ' with endpoint "' + Config.endpoint + '"!');
});