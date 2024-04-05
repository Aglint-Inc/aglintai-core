import { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalender } from '@/src/utils/integrations/google-calender';

type BodyParams = {
  event_id: string;
  organizer_id: string;
  status: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { organizer_id, event_id } = req.body as BodyParams;
  if (!organizer_id || !event_id) return res.status(400).send('missing Fields');
  try {
    const google_cal = new GoogleCalender(null, organizer_id);
    await google_cal.authorizeUser();
    await google_cal.updateEventStatus(event_id, 'cancelled');
    return res.status(200).send('ok');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
