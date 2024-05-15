import express from 'express';
import {callStatus} from '../controllers/twilio/callStatus';

const twilioRouter = express.Router();
twilioRouter.post('/call-status', callStatus);
export default twilioRouter;
