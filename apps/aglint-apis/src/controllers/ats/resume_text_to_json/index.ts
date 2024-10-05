import {getResponse, logToken, saveToDB, sendToken} from './util';
import {parseJson} from './jsonProcessing';
import axios from 'axios';

// const Text_TO_JSON = "http://localhost:8083/";

import dotenv from 'dotenv';
import {getEmbeddings} from './embedding';
import {getLocation} from './geoLoaction';
import {supabaseAdmin} from 'src/services/supabase/SupabaseAdmin';
import {getOpenAi} from 'src/services/LLM/openAi';
import {Request, Response} from 'express';
dotenv.config();

const resume_scoring = process.env.RESUME_SCORING;

if (!resume_scoring) {
  throw new Error('resume_scoring environment variables are required.');
}

export async function resume_text_to_json(req: Request, res: Response) {
  if (req.method === 'POST') {
    const {
      resume_text,
      jd_json,
      application_id,
      candidate_id,
      file_id,
      loggerDetails,
      parameter_weights,
      test,
    } = req.body as unknown as {
      resume_text: string;
      jd_json: any;
      application_id: string;
      candidate_id: string;
      file_id: string;
      loggerDetails: {[key: string]: string};
      parameter_weights: any;
      test?: boolean;
    };
    if (
      !resume_text &&
      resume_text.trim() === '' &&
      !jd_json &&
      !application_id
    ) {
      return res.status(400).send(
        getResponse({
          error: 'Invalid request. Required payload missing.',
          application_id,
        })
      );
    }
    try {
      const openai = getOpenAi();
      const {result: json_resume, token} = await parseJson(resume_text || '');
      // const embeddings = {};
      const embeddings = await getEmbeddings(openai, json_resume);

      // get geolocation
      let location: {
        geolocation: string;
        city: any;
      } | null = null;
      // @ts-ignore
      const baseLocations = json_resume?.basics?.location;
      if (baseLocations) {
        try {
          location = await getLocation(
            `${baseLocations.city}, ${baseLocations.state}, ${baseLocations.country}`
          );
        } catch (e) {
          console.error('error in get geolocation', String(e));
        }
      }
      let saved = false;
      const geoDataAndExp = {
        // @ts-ignore
        experience_in_months: json_resume?.basics?.totalExperienceInMonths,
        // @ts-ignore
        city: location?.city,
        // @ts-ignore
        state: location?.state,
        // @ts-ignore
        country: location?.country,
        geolocation: location?.geolocation,
      };

      if (!test && application_id && candidate_id && file_id) {
        saved =
          (await saveToDB({
            table: 'candidate_files',
            data: {resume_json: json_resume, ...embeddings},
            id: file_id,
          })) &&
          (await saveToDB({
            table: 'candidates',
            data: geoDataAndExp,
            id: candidate_id,
          }));
        await logToken(application_id, token);
      }
      const {data} = await supabaseAdmin.rpc('get_recruiter_name_id', {
        in_application_id: application_id,
      });
      sendToken(
        token.totalExecutionTokens,
        token.totalPromptTokens,
        token.totalCompletionTokens,
        data[0].name
      );
      // call next api
      if (!test) {
        axios.post(resume_scoring, {
          resume_text,
          resume_json: json_resume,
          jd_json,
          loggerDetails,
          parameter_weights,
          application_id,
          file_id,
        });
      }
      return res.status(200).json(
        getResponse({
          json: {geoDataAndExp, ...json_resume},
          embeddings,
          saved,
          application_id,
          token,
        })
      );
    } catch (error) {
      let errorMessage = 'Internal Server Error at: parseJson.';
      if (typeof error === 'string') {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return res
        .status(200)
        .json(getResponse({error: errorMessage, application_id}));
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send(getResponse({error: 'Method Not Allowed!'}));
    return;
  }
}

export const runtime = 'edge';
// getLocation("san jos").then((data) => console.log(data));
