/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { ZoomMeet } from '@/src/utils/integrations/zoom-meet';

export type BodyParams = {
  recruiter_id;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { recruiter_id } = req.body as BodyParams;
    const zoom_meet = new ZoomMeet(recruiter_id);
    await zoom_meet.authorizeUser();
    const meet = await zoom_meet.createMeeting({
      topic: 'meeting name',
      agenda: 'suumary',
      default_password: false,
      duration: 60,
      start_time: new Date().toISOString(),
      timezone: 'Asia/columbia',
      type: 2,
      settings: {
        host_video: true,
        approval_type: 1,
        participant_video: true,
        waiting_room: true,
      },
    });
    return res.status(200).send(meet);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export default handler;
