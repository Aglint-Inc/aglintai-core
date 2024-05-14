import {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import {appLogger} from '../services/logger';

function errorHandler(err: ErrorRequestHandler, req: Request, res: Response) {
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
