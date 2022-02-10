import { Request, Response } from "express";
declare const _default: {
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response): Promise<void>;
    logout(_req: Request, res: Response): Promise<void>;
    logoutAll(_req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    me(_req: Request, res: Response): Promise<void>;
};
export default _default;
