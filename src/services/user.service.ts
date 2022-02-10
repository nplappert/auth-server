import { User, userRepository } from "../models/user.model";

export default new class UserService {

    async createUser(email: string, password: string): Promise<User> {
        try {
            let user = userRepository.createEntity();
            user.email = email;
            user.password = password;

            const creationDate: number = Date.now();
            user.createdAt = creationDate;
            user.updatedAt = creationDate
            
            user.tokenVersion = 0;
            
            await userRepository.save(user);

            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to create user");
        }     
    }

    async getUserById(userId: string): Promise<User> {
        try {
            const user = await userRepository.fetch(userId);
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to get user by id"); 
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await userRepository.search().where('email').eq(email).returnFirst();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to get user by email"); 
        }
    }

    async increaseTokenVersion(userId: string): Promise<void> {
        try {
            let user = await userRepository.fetch(userId);
            user.tokenVersion += 1;

            await userRepository.save(user);
        } catch (error) {
            console.log(error);
            throw new Error("Failed to increase token id"); 
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            await userRepository.remove(userId);
        } catch (error) {            
            console.log(error);
            throw new Error("Failed to delete user");
        }
    }
}