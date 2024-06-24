/* eslint-disable @typescript-eslint/no-unused-vars */
import {Request, Response, ErrorRequestHandler, NextFunction} from 'express';
import {appLogger} from '../services/logger';

function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  appLogger.error('App Error', {
    req_body: req.body,
    error: {
      name: err.name,
      message: err,
    },
  });
  res.status(500).json({error: 'Internal Server Error'});
}

export default errorHandler;
