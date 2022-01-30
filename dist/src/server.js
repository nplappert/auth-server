"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_om_1 = require("redis-om");
(async function () {
    let client = new redis_om_1.Client();
    await client.open('redis://localhost:6379');
    let response = await client.execute(['PING']);
    console.log(response);
    await client.close();
})();
//# sourceMappingURL=server.js.map