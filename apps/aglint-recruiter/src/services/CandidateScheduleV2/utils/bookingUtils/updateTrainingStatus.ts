import { type AssignTrainingInt } from '@aglint/shared-types';
import axios from 'axios';

import { type BookedMeetingDetails } from './types';

export const updateTrainingStatus = async (
  booked_meeting_details: BookedMeetingDetails,
) => {
  try {
    let training_ints: AssignTrainingInt[] = [];
    booked_meeting_details.forEach((meeting) => {
      const curr_train_ints: AssignTrainingInt[] = meeting.training_ints.map(
        (t) => ({
          session_id: meeting.booked_meeting.session_id,
          interviewer_module_relation_id: t.interview_module_relation_id,
        }),
      );
      training_ints = [...training_ints, ...curr_train_ints];
    });
    if (training_ints.length === 0) return;
    const payload: {
      training_ints: AssignTrainingInt[];
    } = { training_ints };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/assign-interviewer-training-type`,
      payload,
    );
  } catch (err) {
    // console.log(err);
  }
};

// module_id, {interview_module_relation_id,type}[]
// required training numbers
