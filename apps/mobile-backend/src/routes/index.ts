import { Router } from 'express';
import allRouts from './allPaths';

const router = Router();

const registerRoutes = (): void => {
  allRouts.forEach((routePath: string) => {
    // const routePath = path.join(directory, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const routeModule: Router = require('.' + routePath).default;
    router.use(routePath, routeModule);
    console.log(`Successfully registered route: ${routePath}`);
  });
};

// // Register all routes
registerRoutes();

// router.use("/example", require("./exampleRoute").default);

export default router;
