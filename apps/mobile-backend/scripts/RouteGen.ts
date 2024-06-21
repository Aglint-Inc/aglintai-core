import * as fs from 'fs';
import * as path from 'path';
function getAPIRoutes(root: string, dir = '/') {
  const result: string[] = [];
  function walkDirectory(rootDir: string, curr_dir?: string) {
    curr_dir = curr_dir || rootDir;
    // eslint-disable-next-line
    const entries = fs.readdirSync(curr_dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(curr_dir, entry.name);
      if (entry.isDirectory()) {
        walkDirectory(rootDir, fullPath);
      } else if (entry.isFile()) {
        let route = curr_dir;
        if (entry.name.startsWith('type')) {
          continue;
        } else if (
          entry.name.startsWith('index') ||
          entry.name.startsWith('route') ||
          entry.name.startsWith('page')
        ) {
          route = route.replace(rootDir, dir);
        } else {
          route = fullPath
            .replace(/\.ts$|\.js$|\.jsx$|\.tsx$/, '')
            .replace(rootDir, dir);
        }
        result.push(route);
      }
    }
  }
  walkDirectory(`${root}${dir}`);
  console.log({ result });
  return result;
}
const directory = path.join(__dirname, '../src/routes');

const routers = getAPIRoutes(directory, '/api');

fs.writeFileSync(
  path.join(directory, 'allPaths.ts'),
  `const allRouts = ${JSON.stringify(routers, null, 2)} as const;\n export default allRouts;`,
  'utf-8',
);
