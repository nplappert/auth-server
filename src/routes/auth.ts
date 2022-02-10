import { Router } from "express";
import authController from "../controllers/auth.controller";


const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/logout-all', authController.logoutAll);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/me', authController.me);

export default authRouter;