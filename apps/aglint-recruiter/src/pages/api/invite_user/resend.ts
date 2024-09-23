import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export type ReInviteType = {
  email: string;
  id: string;
};

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, id } = req.body as unknown as ReInviteType;
    if (!email && !id) {
      return res
        .status(400)
        .send({ message: 'Invalid request. Required props missing.' });
    }

    const { error: emailError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo,
      },
    );
    if (!emailError) {
      return res.send({ emailSend: true, error: null });
    } else {
      return res.status(200).send({
        userDetails: null,
        error: emailError.message || 'Error in resending the invite to user.',
      });
    }
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method Not Allowed!');
}
