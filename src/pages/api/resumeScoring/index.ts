import { candidateInsights } from './candidateInsights';
import { ScoringParam } from './resultParser';
import { ResumeJson } from './types';
// import { promptBuilder } from './promptBuilder';
// import { resultParser } from './resultParser';
// import { scoring } from './scoring';

export default async function handler(req, res) {
  // const { jd_json, resume_json } = req.body;
  // const results = await promptBuilder(jd_json, resume_json);
  // const resultObj = resultParser(results);
  const badges = //results ?
    candidateInsights(resObj.resultObj, resObj.resume_json);
  // : null;
  // const scores = results ? scoring(resultObj) : null;
  res.status(200).send({ response: { badges } });
}

const resObj = {
  resume_json: {
    positions: [
      {
        end: {
          year: 2023,
          month: 12,
        },
        level: 'Senior-level',
        org: 'A',
        start: {
          year: 2021,
          month: 12,
        },
      },
      {
        end: {
          year: 2023,
          month: 12,
        },
        level: 'Senior-level',
        org: 'B',
        start: {
          year: 2021,
          month: 12,
        },
      },
      {
        end: {
          year: 2023,
          month: 12,
        },
        level: 'Senior-level',
        org: 'C',
        start: {
          year: 2021,
          month: 12,
        },
      },
      {
        end: {
          year: 2023,
          month: 12,
        },
        level: 'Senior-level',
        org: 'D',
        start: {
          year: 2021,
          month: 12,
        },
      },
    ],
  } as ResumeJson,
  resultObj: {
    schools: [
      {
        rating: 'medium',
        index: 0,
      },
      {
        rating: 'high',
        index: 1,
      },
      {
        rating: 'low',
        index: 3,
      },
      {
        rating: 'low',
        index: 2,
      },
    ],
    positions: [
      {
        rating: 'high',
        index: 0,
      },
      {
        rating: 'high',
        index: 1,
      },
      {
        rating: 'high',
        index: 2,
      },
      {
        rating: 'high',
        index: 3,
      },
    ],
    skills: {
      list: {
        Frontend: 'high',
        Javascript: 'high',
        Typescript: 'high',
        ES6: 'medium',
        'React JS': 'high',
        'React Native': 'low',
        Redux: 'medium',
        'Web Services': 'medium',
        'C#': 'low',
        'Agile Methodologies': 'low',
        Hindi: 'low',
        Bengali: 'low',
        English: 'low',
        JavaScript: 'high',
        React: 'high',
        TypeScript: 'high',
        'Next JS': 'medium',
        Express: 'medium',
        Node: 'high',
        'Webpack/Babel': 'medium',
        CSS: 'medium',
        HTML: 'medium',
        Git: 'medium',
        SQL: 'low',
        'TDD with Jest': 'medium',
        'ASP.NET': 'low',
      },
    },
  } as unknown as ScoringParam,
};
