import { Router } from 'express';
import { scheduler } from '../../../../controllers/schedulingControllerX';
// import { scheduler } from '../../../../controllers/schedulingController';

/**
 * @swagger
 * /api/v1/scheduling:
 *   get:
 *     summary: Get all examples
 *     description: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
const router: Router = Router();

router.route('/').post(scheduler);

export default router;
