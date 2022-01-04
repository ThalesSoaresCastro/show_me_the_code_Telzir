import 'dotenv/config';
import express, {
    Request, 
    Response,
} from 'express';

import swaggerUi from 'swagger-ui-express';

import swaggerDocs from "@/docs/swagger.json";

import cors from 'cors';
import router from './routes';

import morganMiddleware from '@middlewares/morganMiddleware';

const app  = express();

app.use(express.json());


app.use(morganMiddleware);

//cors config
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    app.use(cors)
    next()
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', async(req: Request, res: Response) =>{
    return res.status(200).send({
        "API-Version": "1.0",
    });
});

app.use(router);


export default app;
