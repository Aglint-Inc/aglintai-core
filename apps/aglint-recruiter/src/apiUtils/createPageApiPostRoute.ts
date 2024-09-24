/* eslint-disable no-unused-vars */
import { CApiError } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as v from 'valibot';
export const createPageApiPostRoute = (
  schema: any,
  call_back_handler: (p: any) => any,
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
      }
      let parsed_body;
      if (schema) {
        parsed_body = v.parse(schema, req.body);
      } else {
        parsed_body = req.body;
      }
      const resp = await call_back_handler(parsed_body);
      return res.status(200).json(resp);
    } catch (error) {
      console.error(error);
      if (error instanceof CApiError) {
        if (error.type === 'CLIENT') {
          return res
            .status(400)
            .json({ type: error.type, error: error.message });
        } else {
          return res
            .status(500)
            .json({ type: error.type, error: error.message });
        }
      }
      return res.status(500).json({ type: 'UNKNOWN', error: error.message });
    }
  };
};
