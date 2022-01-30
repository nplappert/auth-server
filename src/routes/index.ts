import { Request, Response, Router } from "express";
import authRouter from "./auth";

const routes = Router();


routes.use('/api/auth', authRouter);
routes.use('/', (_req: Request, res: Response) => {
    res.status(200).json('OK');
});


export default routes;