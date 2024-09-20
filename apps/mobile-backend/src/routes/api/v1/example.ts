import { Router } from 'express';
import {
  createExample,
  getExample,
} from '../../../controllers/exampleController';

/**
 * @swagger
 * /api/v1/example:
 *   get:
 *     summary: Get all examples
 *     description: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 */
const router: Router = Router();

router.route('/').get(getExample).post(createExample);

export default router;
