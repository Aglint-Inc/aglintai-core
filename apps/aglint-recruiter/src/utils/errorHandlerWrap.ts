import { CApiError } from '@aglint/shared-utils/src/customApiError/customApiError';
import { type NextApiRequest, type NextApiResponse } from 'next';

export const addErrorHandlerWrap = (call_back) => {
  const handlerWrap = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await call_back(req, res);
    } catch (err: any) {
      if (err instanceof CApiError) {
        return res.status(500).json({
          type: err.type,
          message: err.message,
        });
      } else {
        console.error(err);
      }
      return res.status(500).json({
        type: err.name,
        message: err.message,
      });
    }
  };
  return handlerWrap;
};
