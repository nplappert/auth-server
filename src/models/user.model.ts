import { Entity, Schema, Client, Repository } from "redis-om";

export class User extends Entity { };

export interface User {
    email: string,
    password: string,
    createdAt: number,
    updatedAt: number,
    tokenVersion: number 
};

let userSchema = new Schema(User, {
    email: { type: 'string' },
    password: { type: 'string' },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
    tokenVersion: { type: 'number' }
}, {
    dataStructure: 'JSON'
});

let client = new Client();
export let userRepository = new Repository(userSchema, client);

const init = async () => {
    await client.open(process.env.REDIS_URL!);
    await userRepository.dropIndex();
    await userRepository.createIndex();
};

init();