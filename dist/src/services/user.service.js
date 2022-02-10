"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
exports.default = new class UserService {
    async createUser(email, password) {
        try {
            let user = user_model_1.userRepository.createEntity();
            user.email = email;
            user.password = password;
            const creationDate = Date.now();
            user.createdAt = creationDate;
            user.updatedAt = creationDate;
            user.tokenVersion = 0;
            let userId = await user_model_1.userRepository.save(user);
            return userId;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to create user");
        }
    }
    async getUserById(userId) {
        try {
            const user = await user_model_1.userRepository.fetch(userId);
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to get user by id");
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await user_model_1.userRepository.search().where('email').eq(email).returnFirst();
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to get user by email");
        }
    }
    async increaseTokenVersion(userId) {
        try {
            const user = await user_model_1.userRepository.fetch(userId);
            user.tokenVersion++;
            return await user_model_1.userRepository.save(user);
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to increase token id");
        }
    }
    async deleteUser(userId) {
        try {
            await user_model_1.userRepository.remove(userId);
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to delete user");
        }
    }
};
//# sourceMappingURL=user.service.js.map