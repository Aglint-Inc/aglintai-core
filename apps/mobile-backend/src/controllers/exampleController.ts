import { Request, Response } from 'express';

export const getExample = (req: Request, res: Response): void => {
  res.send('GET example endpoint');
};

export const createExample = (req: Request, res: Response): void => {
  res.send('POST example endpoint');
};
