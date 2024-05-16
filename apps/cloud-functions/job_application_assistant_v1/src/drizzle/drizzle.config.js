"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
exports.default = {
    schema: "./src/schema/*",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: utils_1.connectionString,
    },
};
