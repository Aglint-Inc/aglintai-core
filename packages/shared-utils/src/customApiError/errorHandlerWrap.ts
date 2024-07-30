import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from './customApiError';

export const addErrorHandlerWrap = (call_back) => {
  const handlerWrap = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await call_back(req, res);
    } catch (err: any) {
      console.error(err);
      if (err instanceof ApiError) {
        return res.status(500).json({
          type: err.type,
          message: err.message,
        });
      }
      return res.status(500).json({
        type: err.name,
        message: err.message,
      });
    }
  };
  return handlerWrap;
};
