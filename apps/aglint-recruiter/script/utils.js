"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJsFilesInDir = exports.writeToFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function writeToFile(path, data) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    (0, fs_1.writeFileSync)(path, data, 'utf-8');
}
exports.writeToFile = writeToFile;
var deleteJsFilesInDir = function (dir) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    (0, fs_1.readdir)(dir, function (err, files) {
        if (err) {
            console.error("Error reading directory: ".concat(err));
            return;
        }
        files.forEach(function (file) {
            if (file.endsWith('.js')) {
                var filePath = (0, path_1.join)(dir, file);
                // eslint-disable-next-line security/detect-non-literal-fs-filename
                (0, fs_1.unlink)(filePath, function (err) {
                    if (err) {
                        console.error("Error deleting file: ".concat(err));
                        return;
                    }
                });
            }
        });
    });
};
exports.deleteJsFilesInDir = deleteJsFilesInDir;
