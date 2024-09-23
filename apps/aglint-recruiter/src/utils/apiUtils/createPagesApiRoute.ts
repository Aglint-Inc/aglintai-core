import { CApiError } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

export const createPagesApiRoute = async (zod_schema: any, call_back: any) => {
  const route = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const parsedData = zod_schema.parse({
        ...req.body,
      });
      const response = await call_back(parsedData);
      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof CApiError) {
        if (error.type === 'CLIENT') {
          console.error('Client error', error);
          return res.status(400).json({
            status: 400,
            error: error.message,
          });
        }
        console.error('Server error', error);
        return res.status(500).json({
          status: 500,
          error: `Internal Server Error`,
        });
      }
    }
  };
  return route;
};
