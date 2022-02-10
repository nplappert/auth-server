import { User } from "../models/user.model";
declare const _default: {
    createUser(email: string, password: string): Promise<string>;
    getUserById(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    increaseTokenVersion(userId: string): Promise<string>;
    deleteUser(userId: string): Promise<void>;
};
export default _default;
