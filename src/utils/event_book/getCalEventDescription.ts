export const getCalEventDescription = (meeting_id) => {
  const instruction_link = `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/view?meeting_id=${meeting_id}&tab=instructions`;
  const profile_link = `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`;
  const feedback_link = `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/view?meeting_id=${meeting_id}&tab=feedback`;
  const reschedule_link = `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`;
  return (
    `<p>Interview Details:</p>` +
    `<p>Candidate Profile: <a href="${profile_link}">here</a>.</p>` +
    `<p>Interview Instructions:</p>` +
    `<p>Please review the interview instructions <a href="${instruction_link}">here</a>.</p>` +
    `<p>Provide Feedback:</p>` +
    `<p>After the interview, kindly provide your feedback <a href="${feedback_link}">here</a>.</p>` +
    `<p>Reschedule or Cancel:</p>` +
    `<p>If you need to reschedule or cancel this meeting, please use the following <a href="${reschedule_link}">here</a>.</p>`
  );
};
