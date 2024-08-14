import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from './customApiError';

export const addErrorHandlerWrap = (call_back) => {
  const handlerWrap = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await call_back(req, res);
    } catch (err: any) {
      if (err instanceof ApiError) {
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
