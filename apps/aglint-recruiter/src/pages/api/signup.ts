/* eslint-disable no-console */
import { type NextApiRequest, type NextApiResponse } from 'next';

import { signupCompanyAdmin } from '@/services/signup/signupCompany';

export type ApiBodyParamsSignup = {
  email: string;
  user_id: string;
  first_name: string;
  last_name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, user_id, first_name, last_name } =
      req.body as ApiBodyParamsSignup;

    const { recruiter_user, recruiter } = await signupCompanyAdmin({
      email,
      user_id,
      first_name,
      last_name,
    });

    return res.status(200).json({
      recruiter_user,
      recruiter,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log('error', error.message);
      res.status(400).send(error.message);
    }
  }
};

export default handler;
