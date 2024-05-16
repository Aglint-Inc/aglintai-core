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

  try {
    console.log('');
    response.status(200).send('Hello');
  } catch (err: any) {
    console.log(err);
    response.status(200).send('Hello');
  }
});
