import {Request, Response} from 'express';
import {OpenAiPromptBuilderResponse} from './types';

import {scoring} from './scoring';
import {candidateInsights} from './candidateInsights';
import {
  openAiRatingResultParser,
  openAiReasoningResultParser,
} from './resultParser';
import {
  openAiRatingPromptBuilder,
  openAiReasoningPromptBuilder,
} from './openAiPromptBuilder';
import {getLists} from './getLists';
import {calculateAndSave} from './util';
// import axios from 'axios';
export const resume_to_score = async (req: Request, res: Response) => {
  try {
    const {
      resume_json,
      jd_json,
      application_id,
      test = false,
    } = req.body as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resume_json: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jd_json: any;
      application_id: string;
      test?: boolean;
    };
    if (!resume_json || !jd_json) {
      throw new Error('Invalid request. Required payload missing.');
    }

    const tempResult = (async () => {
      const results = await openAiRatingPromptBuilder(jd_json, resume_json);

      // handel Error
      const errorRes = results?.find(obj => Boolean(obj.error));
      if (errorRes) {
        throw new Error(errorRes.error?.message || 'Internal server error!');
      }

      const resultObj = results
        ? openAiRatingResultParser(results as OpenAiPromptBuilderResponse)
        : null;
      const badges = resultObj
        ? candidateInsights(resultObj, resume_json)
        : {
            skills: 0,
            schools: 0,
            positions: 0,
            leadership: 0,
            jobStability: 0,
            careerGrowth: 0,
          };
      const relevance = resultObj
        ? getLists(resultObj)
        : {
            skills: null,
            schools: null,
            positions: null,
          };
      const response = resultObj ? scoring(resultObj) : null;
      const scores = {
        education: response?.schools.score || 0,
        experience: response?.positions.score || 0,
        skills: response?.skills.score || 0,
      };
      const reasoningResponse = test
        ? null
        : await openAiReasoningPromptBuilder(
            jd_json,
            resume_json,
            resultObj,
            badges
          );
      const reasoning = test
        ? null
        : openAiReasoningResultParser(reasoningResponse);
      let saved = false;
      const token: {[key: string]: number} = {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      };
      const reasoning_token: {[key: string]: number} = {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      };
      const jd_score = {scores, badges, relevance, reasoning};
      if (!test && application_id) {
        saved = await calculateAndSave(jd_score, application_id);
        // axios
        //   .post(review_candidate_application, {
        //     application_id,
        //   })
        //   .catch(e => {
        //     // do noting
        //   });
        if (response) {
          [
            ...(response.schools.list || []),
            ...(response.positions.list || []),
            {
              tokens: response.skills?.tokens || {
                prompt_tokens: 0,
                completion_tokens: 0,
                total_tokens: 0,
              },
            },
          ].map(data => {
            Object.entries(data.tokens).map(([key, val]) => {
              token[String(key)] += Number(val);
            });
          });
          [
            ...(reasoningResponse?.map(r => {
              return {
                tokens: r?.data?.tokens || {
                  prompt_tokens: 0,
                  completion_tokens: 0,
                  total_tokens: 0,
                },
              };
            }) || []),
          ].map(data => {
            Object.entries(data.tokens).map(([key, val]) => {
              reasoning_token[String(key)] += Number(val);
            });
          });
          //   await Promise.allSettled([
          //     logToken(application_id, token, 'scoring', logger),
          //     logToken(application_id, reasoning_token, 'reasoning', logger),
          //   ]);
        }
      }
      return {
        jd_score: jd_score,
        saved,
        token,
        application_id,
      };
    })();
    const result = await Promise.race([tempResult, timeoutPro()]);

    res.status(200).json(result);
    // return res.json(req.body);
  } catch (err) {
    return res.status(500).json(String(err));
  }
};

const timeoutPro = async () => {
  return new Promise((_, rej) => {
    setTimeout(() => {
      rej('Manual Timeout');
    }, 1000 * 90); // 90 sec
  });
};
