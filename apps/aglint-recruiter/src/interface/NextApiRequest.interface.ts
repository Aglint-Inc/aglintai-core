import {
  NextApiRequest as nextApiRequest,
  NextApiResponse as nextApiResponse,
} from 'next';

export interface NextApiRequest extends nextApiRequest {
  headers: {
    'x-requester-id'?: string;
    'x-requester-role'?: string;
    'x-requester-rec_id'?: string;
  } & nextApiRequest['headers'];
}

export interface NextApiResponse extends nextApiResponse {}
