import {
  APICreateInterviewerRequest,
  DatabaseTable,
} from '@aglint/shared-types';
import axios from 'axios';

export const onInsertInterviewSessionCancel = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_session_cancel'];
}) => {
  if (new_data.session_relation_id && new_data.type === 'declined') {
    await createInterviewerDeclineRequest({
      new_data,
    });
  }
};

const createInterviewerDeclineRequest = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_session_cancel'];
}) => {
  try {
    const payload: APICreateInterviewerRequest = {
      interview_cancel_id: new_data.id,
      session_id: new_data.session_id,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/request/interviewer-request`,
      payload,
    );
  } catch (err) {
    console.error(
      `Failed to perform createInterviewerDeclineRequest`,
      err.message,
    );
  }
};
