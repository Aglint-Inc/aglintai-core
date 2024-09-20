import { type NextRequest as nextApiRequest } from 'next/server';

export interface NextApiRequest extends nextApiRequest {
  headers: {
    'x-requester-id'?: string;
    'x-requester-role'?: string;
    'x-requester-rec_id'?: string;
  } & nextApiRequest['headers'];
}

export interface ApiInterface {
  request: unknown;
  response: unknown;
}
