import express from 'express';
import {resume_to_score} from 'src/controllers/scoring/resume_to_score';

const resume_scoring_Routes = express.Router();

resume_scoring_Routes.post('/', resume_to_score);

export default resume_scoring_Routes;
