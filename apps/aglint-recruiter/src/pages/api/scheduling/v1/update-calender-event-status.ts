import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/services/GoogleCalender/google-calender';

type BodyParams = {
  event_id: string;
  organizer_id: string;
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { organizer_id, event_id } = req.body as BodyParams;
  if (!organizer_id || !event_id) return res.status(400).send('missing Fields');
  try {
    const google_cal = new GoogleCalender(null, null, organizer_id);
    await google_cal.authorizeUser();
    await google_cal.updateEventStatus(event_id, 'cancelled');
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;
