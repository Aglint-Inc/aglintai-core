import express from 'express';
import {createPhoneCall} from '../controllers/phoneAgent/createPhoneCall';
import {llmRetellWs} from '../controllers/phoneAgent/llmRetellWs';

const scheduleAgentRouter = express.Router();

scheduleAgentRouter.post('/create-phone-call', createPhoneCall);

export const mountScheduleAgentWs = () => {
  scheduleAgentRouter.ws('/ws/:call_id', llmRetellWs);
};

export default scheduleAgentRouter;
