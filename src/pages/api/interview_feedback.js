// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let message = req.body.data;
  const formattedData = [];

  for (let i = 0; i < message.length; i += 2) {
    const questionObj = {
      question: message[Number(i)].content,
      user_answer: message[Number(i) + 1].content
    };

    formattedData.push(questionObj);
  }


  const messages = [

    {
      role: "user",
      content: `
      ${JSON.stringify(formattedData).replace(']', '').replace('[', '').replaceAll('},', '').replaceAll('{', '')}

      Analyze users' answers to respect questions and provide feedback on the given topics.
      
      response should be in json format
      [
        {
          "communication_analysis": {
            "feedback": "Analyze the communication skill of the user from his answers and provide feedback in two lines.",
            "rating": "Analyze the communication skill of the user from his answers and provide a rating out of 100 in numeric form only. give zero a rating if none of the answers is correct"
          }
        },
        {
          "language_analysis": {
            "feedback": "Analyze the quality and coherence of the language of the user from his answers and provide feedback in two lines.",
            "rating": "Analyze the quality and coherence of the language of the user from his answers and provide a rating out of 100 in numeric form only. give a zero rating if none of the answers is correct"
          }
        },
        {
          "skill_analysis": {
            "feedback": "Analyze the depth of knowledge of the domain or skills of the user from his answers and provide feedback in two lines.",
            "rating": "Analyze the depth of knowledge of the domain or skills of the user from his answers and provide a rating out of 100 in numeric form only. give a zero rating if none of the answers is correct"
          }
        },
        {
          "relevance_analysis": {
            "feedback": "Analyze users' correct answers related to questions and provide feedback in two lines.",
            "rating": "Analyze users' correct answers related to questions and provide a rating out of 100 in numeric form only. give a zero rating if none of the answers is correct."
          }
        }
      ]
      `,
    },
  ];



  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: messages,
    temperature: 0,
    response_format: {
      type: "json_object",
    },
  });
  res.send({
    response: completion.choices[0].message,
    token: completion["usage"],
  });
}




