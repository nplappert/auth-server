import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";

const port = process.env.PORT! ?? '5001';
const app = express();


const main = async () => {
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