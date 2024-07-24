import * as fs from 'fs';
import * as path from 'path';

import { deleteJsFilesInDir } from './utils';

function processDirectory(
  rootDirs: {
    [key: string]: { basePath: string; appRouter: boolean };
  },
  outputFiles: {
    path: string;
    objectName: string;
    // eslint-disable-next-line no-unused-vars
    filter?: (x: string[]) => string[];
  }[],
) {
  let result: string[] = [];

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

  // filter out wrong PATH SEPARATOR

  if (path.sep === path.win32.sep) {
    result = result.map((item) =>
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      item.replace(new RegExp('\\' + path.win32.sep, 'g'), '/'),
    );
  }

  // write to file
  outputFiles.forEach((item) => {
    const tempResult = item.filter?.(item.filter(result)) || result;
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.writeFileSync(
      item.path,
      `export const ${item.objectName} = [\n${tempResult
        .sort()
        .map((item) => "'" + item + "'")
        .join(',\n')}\n] as const`,
      'utf-8',
    );
  });
}

// const args = process.argv.slice(2);

// const rootDirectory = args[0].split(',') || ['.'];
// const outputFile = args[1] || 'script/paths.ts';
const rootDirectory = {
  [path.join('src', 'pages')]: {
    basePath: '',
    appRouter: false,
  },
  [path.join('../aglint-mail/src/app', 'api')]: {
    basePath: path.join('/api', 'emails'),
    appRouter: true,
  },
};
const allPathOutputFile = path.join('src/constant', 'allPaths.ts');
const apiPathOutputFile = path.join('src/constant', 'apiPaths.ts');

processDirectory(rootDirectory, [
  { path: allPathOutputFile, objectName: 'PATHS' },
  {
    path: apiPathOutputFile,
    objectName: 'API_PATHS',
    filter: (x) => x.filter((item) => item.startsWith('/api')),
  },
]);

// deleted compiled file
deleteJsFilesInDir(__filename);
