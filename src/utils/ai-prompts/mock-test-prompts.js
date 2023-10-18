/* eslint-disable security/detect-object-injection */
export let mockTestPrePrompts = (interviewDetails) => {
  const jsonData = interviewDetails.screening_questions[0];
  // Extract and format the questions
  const skills = [];
  const cultural = [];
  const softSkills = [];
  const personality = [];

  for (const category in jsonData) {
    const questions = jsonData[category].questions;

    for (const question of questions) {
      if (jsonData[category].copy === 'Skill') {
        skills.push(question.question);
      }
      if (jsonData[category].copy === 'Soft Skills') {
        softSkills.push(question.question);
      }
      if (jsonData[category].copy === 'Cultural') {
        cultural.push(question.question);
      }
      if (jsonData[category].copy === 'Personality') {
        personality.push(question.question);
      }
    }
  }
  const promptInjectForSkills = skills.length
    ? {
        role: 'system',
        content: `here is the skill based questions
          ${skills.map((question) => `${question}\n`).join('')}`,
      }
    : {
        role: 'system',
        content: '',
      };

  const promptInjectForSoftSkills = softSkills.length
    ? {
        role: 'system',
        content: `here is the soft-skills based questions
          ${softSkills.map((question) => `${question}\n`).join('')}`,
      }
    : {
        role: 'system',
        content: '',
      };

  const promptInjectForCultural = cultural.length
    ? {
        role: 'system',
        content: `here is the cultural based questions
          ${cultural.map((question) => `${question}\n`).join('')}`,
      }
    : {
        role: 'system',
        content: '',
      };

  const promptInjectForPersonality = personality.length
    ? {
        role: 'system',
        content: `here is the personality based questions
          ${personality.map((question) => `${question}\n`).join('')}`,
      }
    : {
        role: 'system',
        content: '',
      };

  const prompt = [
    {
      role: 'system',
      content: `Act as an interviewer at ${interviewDetails.company}, and i am applying for a ${interviewDetails.job_title}. As an interviewer, you won't provide the answer. you'll ask only question from the list.`,
    },
    {
      role: 'system',
      content: `ask one question wait for my response before proceeding to the next question all questions should be small, don't ask too big question, and if my response is out of the interview context, you won't address it.`,
    },
    {
      role: 'system',
      content: `i will provide list of questions based on category `,
    },
    promptInjectForPersonality,
    promptInjectForSoftSkills,
    promptInjectForSkills,
    promptInjectForCultural,
    {
      role: 'system',
      content: `I want you to ask question in sequence from the list of questions without specifying the category or question number.`,
    },
    {
      role: 'assistant',
      content: 'sure got it i will ask question from list of questions',
    },
  ];
  // eslint-disable-next-line no-console
  console.log('table', [...personality, ...softSkills, ...skills, ...cultural]);
  return prompt;
};

// return [
//   {
//     role: 'system',
//     content: `Act as an interviewer at ${interviewDetails.company}, and i am applying for a ${interviewDetails.job_title}. As an interviewer, you won't provide the answer. you'll ask only interview-relevant question.`,
//   },
//   {
//     role: 'system',
//     content: `ask one question wait for my response before proceeding to the next question all questions should be small, don't ask too big question, and if my response is out of the interview context, you won't address it.`,
//   },
//   {
//     role: 'system',
//     content: `i will give company information, requirements and responsibilities
//     bellow, you must ask some question from there`,
//   },
//   {
//     role: 'system',
//     content: `here is about company:

//     ${interviewDetails.company_details}`,
//   },
//   {
//     role: 'system',
//     content: `here is the Job requirment:

//     ${interviewDetails.requirements}

//     and also extract the skills from it and ask questions from it.
//     `,
//   },
//   {
//     role: `system`,
//     content: `here is the candidate responsibilities:

//     ${interviewDetails.responsibilities}`,
//   },

//   {
//     role: 'assistant',
//     content: `Thanks for providing me company infomations, some of the question i will ask from your here`,
//   },
//   {
//     role: 'system',
//     content: `don't give answers of candidate's question only ask the question`,
//   },
//   {
//     role: 'assistant',
//     content: `sure i will not give the answers`,
//   },

//   {
//     role: 'system',
//     content: `If the user does not provide answers, kindly decline their application in a polite manner.`,
//   },
//   {
//     role: 'assistant',
//     content: `sure i will do that`,
//   },

//   {
//     role: 'system',
//     content: `ask one questions at a time `,
//   },
//   {
//     role: 'assistant',
//     content: `sure, i will ask one question at a time`,
//   },
// ];
