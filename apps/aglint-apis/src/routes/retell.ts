import express from 'express';
import {fetchCallDetails} from '../controllers/retell/fetchCallDetails';

const retellRoutes = express.Router();

retellRoutes.post('/call-details', fetchCallDetails);

export default retellRoutes;
