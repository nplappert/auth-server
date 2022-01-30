import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Client } from "redis-om";
import routes from "./routes";

const port = 5000;
const app = express();
const client = new Client();


const main = async () => {
    await client.open('redis://localhost:6379');
    console.log(await client.execute<string>(['PING']));

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }))
    app.use(cookieParser());
    app.use(express.json({ limit: '15kb' }));

    app.use(routes);

    app.listen(port, async () => {
        console.log(`Authantication server is running on http://localhost:${port}`); 
    });
};

main().catch((err) => {
    console.log(err);
});