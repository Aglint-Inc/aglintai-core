import {Request, Response} from 'express';
import {z} from 'zod';
import {agentHandler} from 'src/agents/testAgent/agent';

const agent_payload_schema = z.object({
  msg: z.string(),
  company_id: z.string(),
  user_tz: z.string(),
  history: z
    .object({
      type: z.enum(['user', 'assistant']),
      value: z.string(),
    })
    .array(),
});

export const agentController = async (req: Request, res: Response) => {
  const {data: api_body, error: parse_err} = agent_payload_schema.safeParse(
    req.body
  );
  try {
    if (parse_err) {
      throw new Error(parse_err.message);
    }

    const {new_history: updated_history} = await agentHandler({
      msg: api_body.msg,
      history: api_body.history as any, // TODO: fix
      company_id: api_body.company_id,
      user_tz: api_body.user_tz,
    });

    return res.status(200).json({updated_history});
  } catch (error: any) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};
