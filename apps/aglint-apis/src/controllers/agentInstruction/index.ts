import {Request, Response} from 'express';
import {extractSelfScheduleJson} from './selfScheduleInstructionJson';

//
export const selfScheduleRequest = async (req: Request, res: Response) => {
  try {
    const instruction_str = req.body.instruction;
    const extractedJson = await extractSelfScheduleJson(instruction_str);
    return res.status(200).json(extractedJson);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
