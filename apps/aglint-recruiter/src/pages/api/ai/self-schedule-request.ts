import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/agent-instruction/self-schedule`,
      {
        instruction: req.body.instruction,
      },
    );
    res.status(200).json({ response: resp.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
