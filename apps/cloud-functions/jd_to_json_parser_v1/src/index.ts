import {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework';
import { parseJdToJson } from './jdParser';
import { getResponse, saveToDB } from './util';

// import { JdToAISuggestion } from './aiSuggestions';
import dotenv from 'dotenv';
dotenv.config();
const jd_to_json = process.env.jd_to_json_v1;
if (!jd_to_json) {
  throw new Error('jd_to_json environment variables are required.');
}

export const hello: HttpFunction = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { job_id, job_title, job_description, skills, retry, test } =
      req.body as {
        job_id: string;
        job_title: string;
        job_description: string;
        skills: string[];
        retry: number;
        test: boolean;
      };
    if (!job_id || !job_title || !job_description) {
      return res.status(400).send(
        getResponse({
          error: `Invalid request. Required payload missing.`,
        })
      );
    }
    console.log('received request for:', job_id, 'retry:', retry);
    try {
      const { result, token } = await parseJdToJson(
        {
          job_title,
          job_description,
          skills,
        },
        retry
      ).catch(async (error) => {
        if (retry > 0 && job_id) {
          fetch(jd_to_json, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              job_id,
              job_title,
              job_description,
              skills,
              retry: retry === 1 ? undefined : retry - 1,
            }),
          });
        }
        res.status(200).json(getResponse({ error, retry, job_id }));
        return {
          result: null,
          token: { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 },
        };
      });
      if (res.headersSent) return;
      let saved = false;
      if (!test && job_id) {
        saved = await saveToDB(
          { jd_json: { title: job_title, ...result } },
          job_id
        );
      }

      return res.status(200).send(
        getResponse({
          jd_json: { title: job_title, ...result },
          saved,
          token,
        })
      );
    } catch (error) {
      let errorMessage = 'Internal Server Error at: jd_parsing.';
      if (typeof error === 'string') {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error({ error: String(error), sent: res.headersSent });
      // const saved = await saveToDB({resume_text,resume_json:{error:errorMessage}}, application_id);
      return res.status(200).json(getResponse({ error: errorMessage, job_id }));

      // .send(await JdToAISuggestion({ job_title, job_description }))
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send(getResponse({ error: 'Method Not Allowed!' }));
    return;
  }
};

// const sample = {
//   job_title: 'Software Developer',
//   job_description: `<h5>Company Overview:</h5><ul><li><p>Our mission is to support both businesses and their employees in navigating these transitions, ultimately creating a world where change fosters progress and resilience.</p></li></ul><h5>Responsibilities:</h5><ul><li><p>Designing, coding, and testing software applications using languages and frameworks such as Java, C++, and .NET</p></li><li><p>Collaborating with cross-functional teams to define, design, and ship new features</p></li><li><p>Debugging, troubleshooting, and resolving software defects</p></li></ul><h5>Qualifications:</h5><ul><li><p>Bachelor's degree in Computer Science or related field</p></li><li><p>Strong programming skills in Java, C++, or .NET</p></li><li><p>Experience with software development methodologies and tools</p></li></ul><h5>Benefits:</h5><ul><li><p>Competitive salary and benefits package</p></li><li><p>Opportunity for professional growth and advancement</p></li><li><p>Flexible work hours and remote work options</p></li></ul><h5>Company Values:</h5><ul><li><p>Innovation and creativity</p></li><li><p>Collaboration and teamwork</p></li><li><p>Diversity and inclusion</p></li><li><p>Continuous learning and improvement</p></li><li><p>Customer-centric approach</p></li></ul>`,
//   // skills: ['Programming', 'C'],
// };
