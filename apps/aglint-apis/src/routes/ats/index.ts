import express from 'express';
import {resume_text_to_json} from 'src/controllers/ats/resume_text_to_json';
import {resume_to_score} from 'src/controllers/ats/resume_to_score/resume_to_score';
const router = express.Router();

// POST /api/ats/resume_text_to_json
router.post('/resume_text_to_json', resume_text_to_json);

// POST /api/ats/resume_to_score
router.post('/resume_to_score', resume_to_score);

export default router;
