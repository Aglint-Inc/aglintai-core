import {
  APIFindAltenativeTimeSlot,
  APIFindAltenativeTimeSlotResponse,
  APIUpdateMeetingInterviewers,
} from '@aglint/shared-types';
import { addErrorHandlerWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];
  const {
    listInterviewerPayload,
    updatedMeetingPayload,
  }: {
    listInterviewerPayload: APIFindAltenativeTimeSlot;
    updatedMeetingPayload: APIUpdateMeetingInterviewers;
  } = req.body;

  try {
    // list interviewers
    const { data: interviewerList } = (await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find-alternative-time-slots`,
      listInterviewerPayload,
    )) as { data: APIFindAltenativeTimeSlotResponse };

    if (!interviewerList || !interviewerList?.length) {
      // inform to organizer
      return res.status(200).end();
    } else {
      // change the interviewer
      const bodyParams: APIUpdateMeetingInterviewers = {
        meeting_id: interviewerList[0].meeting_id,
        candidate_email: updatedMeetingPayload.candidate_email,
        replaced_inters: [
          {
            email: interviewerList[0].qualifiedIntervs[0].email,
            user_id: interviewerList[0].qualifiedIntervs[0].user_id,
          },
        ],
      };

      const { data: updatedInterviewer } = await axios.post(
        '/api/scheduling/v1/update_meeting_interviewers',
        bodyParams,
      );
      // eslint-disable-next-line no-console
      console.log('updatedInterviewer', updatedInterviewer);
      return res.status(200).end();
    }
  } catch (error) {
    return error;
  }
};

export default addErrorHandlerWrap(handler);






// const { data: interviewerList } = await axios.post(
//   '/api/agent-workflow/interviewer-decline',
//   {
//     listInterviewerPayload: {
//       ...bodyParams,
//     } as APIFindAltenativeTimeSlot,
//   },
// );