import express from 'express';
import {agentController} from 'src/controllers/agent/agentController';

const aglintAgentRouter = express.Router();

aglintAgentRouter.post('/aglint-agent', agentController);

export default aglintAgentRouter;
