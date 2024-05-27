"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function processDirectory(rootDir, outputFile) {
    var result = [];
    function walkDirectory(dir) {
        var entries = fs.readdirSync(dir, { withFileTypes: true });
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walkDirectory(fullPath);
            }
            else if (entry.isFile()) {
                if (entry.name.startsWith('type')) {
                    continue;
                }
                else if (entry.name.startsWith('index')) {
                    result.push(dir.replace(rootDir, ''));
                }
                else {
                    var filePath = fullPath
                        .replace(/\.ts$|\.js$|\.jsx$|\.tsx$/, '')
                        .replace(rootDir, '');
                    result.push(filePath);
                }
            }
        }
    }
    walkDirectory(rootDir);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(outputFile, "export const PATHS = [\n".concat(result.map(function (item) { return '"' + item + '"'; }).join(',\n'), "\n] as const"), 'utf-8');
}
var args = process.argv.slice(2);
var rootDirectory = args[0] || '.';
var outputFile = args[1] || 'script/paths.ts';
processDirectory(rootDirectory, outputFile);
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
// const argv = yargs(hideBin(process.argv))
//   .option('scan', {
//     alias: 's',
//     type: 'string',
//     description: 'scan path',
//     demandOption: false,
//   })
//   .option('file', {
//     alias: 'f',
//     type: 'string',
//     description: 'output file path',
//     demandOption: false,
//   }).argv;
// type path_Node = {
//   path: string;
//   leaf_node: boolean;
//   child_nodes: path_Node[];
// };
// function convertToTreeStructure(paths: string[]): path_Node {
//   const tree: path_Node = { path: '', leaf_node: false, child_nodes: [] };
//   paths.forEach((path) => {
//     const segments = path.split('/').filter((segment) => segment !== '');
//     let currentNode = tree;
//     segments.forEach((segment) => {
//       if (!currentNode.child_nodes) {
//         currentNode.child_nodes = [];
//       }
//       let childNode = currentNode.child_nodes.find(
//         (node: any) => node.path === segment,
//       );
//       if (!childNode) {
//         childNode = { path: segment, leaf_node: false, child_nodes: [] };
//         currentNode.child_nodes.push(childNode);
//       }
//       currentNode = childNode;
//     });
//     currentNode.leaf_node = true;
//   });
//   return tree;
// }
