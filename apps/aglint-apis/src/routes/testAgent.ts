import express from 'express';
import {selfScheduleRequest} from 'src/controllers/agentInstruction';

const aglintAgentRouter = express.Router();

aglintAgentRouter.post('/self-schedule', selfScheduleRequest);

export default aglintAgentRouter;
