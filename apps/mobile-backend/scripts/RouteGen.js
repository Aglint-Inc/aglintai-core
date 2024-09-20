"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function getAPIRoutes(root, dir) {
    if (dir === void 0) { dir = '/'; }
    var result = [];
    function walkDirectory(rootDir, curr_dir) {
        curr_dir = curr_dir || rootDir;
        // eslint-disable-next-line
        var entries = fs.readdirSync(curr_dir, { withFileTypes: true });
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var fullPath = path.join(curr_dir, entry.name);
            if (entry.isDirectory()) {
                walkDirectory(rootDir, fullPath);
            }
            else if (entry.isFile()) {
                var route = curr_dir;
                if (entry.name.startsWith('type')) {
                    continue;
                }
                else if (entry.name.startsWith('index') ||
                    entry.name.startsWith('route') ||
                    entry.name.startsWith('page')) {
                    route = route.replace(rootDir, dir);
                }
                else {
                    route = fullPath
                        .replace(/\.ts$|\.js$|\.jsx$|\.tsx$/, '')
                        .replace(rootDir, dir);
                }
                result.push(route);
            }
        }
    }
    walkDirectory("".concat(root).concat(dir));
    console.log({ result: result });
    return result;
}
var directory = path.join(__dirname, '../src/routes');
var routers = getAPIRoutes(directory, '/api');
fs.writeFileSync(path.join(directory, 'allPaths.ts'), "const allRouts = ".concat(JSON.stringify(routers, null, 2), " as const;\n export default allRouts;"), 'utf-8');
