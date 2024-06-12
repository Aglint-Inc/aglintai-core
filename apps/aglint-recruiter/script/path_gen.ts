import * as fs from 'fs';
import * as path from 'path';

function processDirectory(
  rootDirs: { [key: string]: { basePath: string; appRouter: boolean } },
  outputFile: string,
) {
  const result: string[] = [];

  function walkDirectory(
    rootDir: string,
    dir: string,
    {
      base = '',
      appRouter = false,
    }: {
      base?: string;
      appRouter?: boolean;
    } = {},
  ) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walkDirectory(rootDir, fullPath, { base, appRouter });
      } else if (entry.isFile()) {
        if (entry.name.startsWith('type')) {
          continue;
        } else if (
          entry.name.startsWith('index') ||
          entry.name.startsWith('route') ||
          entry.name.startsWith('page')
        ) {
          result.push(dir.replace(rootDir, base));
        } else if (!appRouter) {
          const filePath = fullPath
            .replace(/\.ts$|\.js$|\.jsx$|\.tsx$/, '')
            .replace(rootDir, base);
          result.push(filePath);
        }
      }
    }
  }

  Object.keys(rootDirs).map((rootDir) =>
    walkDirectory(rootDir, rootDir, {
      base: rootDirs[String(rootDir)].basePath,
      appRouter: rootDirs[String(rootDir)].appRouter,
    }),
  );

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(
    outputFile,
    `export const PATHS = [\n${result.map((item) => '"' + item + '"').join(',\n')}\n] as const`,
    'utf-8',
  );
}

// const args = process.argv.slice(2);

// const rootDirectory = args[0].split(',') || ['.'];
// const outputFile = args[1] || 'script/paths.ts';
const rootDirectory = {
  'src/pages': {
    basePath: '',
    appRouter: false,
  },
  '../aglint-mail/src/app/api': {
    basePath: 'api/emails',
    appRouter: true,
  },
};
const outputFile = 'script/paths.ts';

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
