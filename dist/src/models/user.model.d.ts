import { Entity, Repository } from "redis-om";
export declare class User extends Entity {
}
export interface User {
    email: string;
    password: string;
    createdAt: number;
    updatedAt: number;
    tokenVersion: number;
}
export declare let userRepository: Repository<User>;
