import express from 'express';
import {agentSupervisor} from 'src/controllers/supervisor/main';

const agentSupervisorRouter = express.Router();

agentSupervisorRouter.post('/agent', agentSupervisor);

export default agentSupervisorRouter;
