import { Request, Response, Router } from "express";


const authRouter = Router();

authRouter.get('/login', (_req: Request, res: Response) => {
    res.status(200).json('Test')
});

export default authRouter;