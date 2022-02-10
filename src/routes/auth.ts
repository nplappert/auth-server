import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth-middleware";

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authMiddleware, authController.logout);
authRouter.post('/logout-all', authMiddleware, authController.logoutAll);
authRouter.get('/me', authMiddleware, authController.me);

export default authRouter;