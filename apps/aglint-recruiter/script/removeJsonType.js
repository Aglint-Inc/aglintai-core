"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable security/detect-non-literal-regexp */
var fs_1 = require("fs");
var path = require("path");
var filePath = path.join(__dirname, '../../../packages/shared-types/src/db/schema.types.ts');
(0, fs_1.readFile)(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var result = data.toString().replace(/export type/g, 'export');
    var fixed = result
        .replace(/export\s+/g, 'export type ')
        .replace(/export\s+type\s+Json\s*=\s*([\s\S]*?\n\n)/g, 'export type Json = any;\n\n');
    (0, fs_1.writeFile)(filePath, fixed, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });
});
