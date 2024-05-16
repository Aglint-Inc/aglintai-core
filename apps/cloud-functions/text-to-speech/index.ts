require('dotenv').config();
import type {
  Request,
  Response,
} from '@google-cloud/functions-framework/build/src/functions';
const functions = require('@google-cloud/functions-framework');

// api function
functions.http('helloHttp', async (request: Request, response: Response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', '*');

  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Max-Age', '3600');
    return response.status(204).send('');
  }

  if (request.method !== 'POST') {
    return response.status(405).end('Method Not Allowed');
  }

  const details = request.body;

  try {
    const url =
      'https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize';
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...details.data,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GOOGLE_TEXT_TO_SPEECH || '',
      },
    });

    const json = await resp.json();

    console.log(json);
    return response.status(200).json(json);
  } catch (err: any) {
    console.log(err);
    response.status(400).send(err?.message);
  }
});
