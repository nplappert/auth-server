"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.User = void 0;
const redis_om_1 = require("redis-om");
class User extends redis_om_1.Entity {
}
exports.User = User;
;
;
let userSchema = new redis_om_1.Schema(User, {
    email: { type: 'string' },
    password: { type: 'string' },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
    tokenVersion: { type: 'number' }
}, {
    dataStructure: 'JSON'
});
let client = new redis_om_1.Client();
exports.userRepository = new redis_om_1.Repository(userSchema, client);
const init = async () => {
    await client.open(process.env.REDIS_URL);
    await exports.userRepository.dropIndex();
    await exports.userRepository.createIndex();
};
init();
//# sourceMappingURL=user.model.js.map