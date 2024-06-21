import fs from 'fs';
import path from 'path';
import { Router } from 'express';

const router = Router();

const registerRoutes = (directory: string): void => {
  getAPIRoutes(directory, '/api').forEach((file: string) => {
    const routePath = path.join(directory, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const routeModule: Router = require(routePath).default;
    router.use(file, routeModule);
    console.log(`Successfully registered route: ${file}`);
  });
};

// // Register all routes
registerRoutes(__dirname);

// router.use("/example", require("./exampleRoute").default);

export default router;

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
  return result;
}
