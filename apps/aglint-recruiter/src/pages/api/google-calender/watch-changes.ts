import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { user_id } = req.body;
    const google_cal = new GoogleCalender(null, null, user_id);
    await google_cal.authorizeUser();
    const resp = await google_cal.watchEvents(user_id);
    return res.status(200).json(resp);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default handler;
