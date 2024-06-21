const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const chrono = require('chrono-node');
require('dotenv').config();

const app = express();
const PORT = 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;
const backendApiUrl = process.env.BACKEND_API_URL;

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Middleware to verify Supabase JWT token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token with Supabase secret
    const decodedToken = jwt.verify(token, supabaseKey);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('Token verification failed', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

const callOpenAIWithTool = async (input) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input: input should be a non-empty string');
  }

  try {
    console.log('Calling OpenAI API with input:', input);
    const response = await openai.chat.completions.create({
      model: 'gpt-4-0613', // Assuming GPT-4 with tool usage capability
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that helps schedule interviews.',
        },
        { role: 'user', content: input },
      ],
      functions: [
        {
          name: 'extract_details',
          description:
            'Extract job, candidate name, date range, and interview name',
          parameters: {
            type: 'object',
            properties: {
              job: { type: 'string' },
              candidateName: { type: 'string' },
              dateRange: { type: 'string' },
              interviewName: { type: 'string' },
            },
            required: ['job', 'candidateName', 'dateRange', 'interviewName'],
          },
        },
        {
          name: 'schedule_interview',
          description: 'Schedule interview with the provided details',
          parameters: {
            type: 'object',
            properties: {
              job: { type: 'string' },
              candidateName: { type: 'string' },
              dateRange: { type: 'string' },
              interviewName: { type: 'string' },
            },
            required: ['job', 'candidateName', 'dateRange', 'interviewName'],
          },
        },
      ],
      function_call: 'auto',
    });
    console.log('Received response from OpenAI:', response.data);
    return response.choices[0].message; // Assuming message includes tool results
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to process input with OpenAI');
  }
};

app.post('/get-availability', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish the SSE connection

  const { inputString } = req.body;
  if (!inputString || typeof inputString !== 'string') {
    res.write(
      'data: Error: Invalid input: input should be a non-empty string\n\n',
    );
    res.end();
    return;
  }

  console.log('Received inputString:', inputString);

  try {
    const openAIResponse = await callOpenAIWithTool(inputString);
    console.log('Received openAIResponse:', openAIResponse);

    const { action, message } = openAIResponse;

    if (action === 'extract_details') {
      res.write(`data: ${message}\n\n`);
      res.end();
    } else if (action === 'schedule_interview') {
      let dateRangeParsed = chrono.parseDate(openAIResponse.dateRange);
      if (!dateRangeParsed) {
        dateRangeParsed = openAIResponse.dateRange; // Fallback to original if parsing fails
      }
      const interviewData = {
        job: openAIResponse.job,
        candidateName: openAIResponse.candidateName,
        dateRange: dateRangeParsed,
        interviewName: openAIResponse.interviewName,
      };
      console.log('Scheduling interview with data:', interviewData);

      // Mock response for schedule-interview
      const finalResponse = {
        data: {
          success: true,
          message: `Interview scheduled for ${interviewData.candidateName} for the ${interviewData.job} position on ${interviewData.dateRange}.`,
        },
      };
      res.write(`data: ${JSON.stringify(finalResponse.data)}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error('Error processing availability:', error);
    res.write(`data: Error: ${error.message}\n\n`);
    res.end();
  }
  return res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
