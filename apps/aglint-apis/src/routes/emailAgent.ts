import express from 'express';
import {composeEmail} from '../controllers/emailAgentController.ts/composeEmail';

const emailAgentRouter = express.Router();

emailAgentRouter.post('/compose-email', composeEmail);

export default emailAgentRouter;
