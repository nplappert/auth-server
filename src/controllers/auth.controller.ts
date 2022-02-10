import { Request, Response } from "express";
import UserService from "../services/user.service";
import bcrypt from "bcrypt";
import { verifyRefreshToken, refreshTokens, setTokens, clearTokens, buildTokens } from "../utils/token.utils";
import { Cookies } from "../interfaces/token-payload";

export default new class AuthController { 
    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Validate if user already exists
            const userValidation = await UserService.getUserByEmail(email);

            if (userValidation) {
                return res.status(400).json({
                    errors: "This user already exits",
                });
            }

            // Create user
            const hashedPassword: string = await bcrypt.hash(password, 10);
            const user = await UserService.createUser(email, hashedPassword);

            const { accessToken, refreshToken } = buildTokens(user);
            setTokens(res, accessToken, refreshToken);
            
            res.json({
                msg: 'User successfully registerd!'
            })
            // res.redirect('clientUrl/me')
        } catch (error) {
            res.status(400).send({ error: error});
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UserService.getUserByEmail(email);

        let isMatch: boolean = false;
        if (user) {
            isMatch = await bcrypt.compare(password, user.password);
        }

        if (!isMatch) {
            res.status(400).json({
                msg: "Invalid credentials",
            });
        }

        const { accessToken, refreshToken } = buildTokens(user);
        setTokens(res, accessToken, refreshToken);

        res.status(200).json({
            msg: "User logged in"
        });
    }

    async logout(_req: Request, res: Response) {
        clearTokens(res);
        res.end();
    }

    async logoutAll(_req: Request, res: Response) {
        console.log(res.locals.token.userId);
        await UserService.increaseTokenVersion(res.locals.token.userId);

        clearTokens(res);
        res.end();
    }

    async refresh(req: Request, res: Response) {
        try {
            const current = verifyRefreshToken(req.cookies[Cookies.RefreshToken]);
            const user = await UserService.getUserById(current.userId);
            if (!user) throw 'User not found';

            const { accessToken, refreshToken } = refreshTokens(current, user.tokenVersion);
            setTokens(res, accessToken, refreshToken);
        } catch (error) {
            clearTokens(res);
        }

        res.end();
    }

    async me(_req: Request, res: Response) {
        const user = await UserService.getUserById(res.locals.token.userId);
        res.json(user);
    }
}