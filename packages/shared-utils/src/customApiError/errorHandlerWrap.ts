import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from './APIError';

export const addErrorHandlerWrap = (call_back) => {
  const handlerWrap = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await call_back(req, res);
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
