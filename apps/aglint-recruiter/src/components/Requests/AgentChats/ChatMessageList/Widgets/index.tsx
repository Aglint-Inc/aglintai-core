
import { type ChatType } from '../hooks/fetch';
import FetchDeclinedInterviews from './FetchDeclinedInterviews';
import FetchScheduledInterviews from './FetchScheduledInterviews';
import UserRequests from './UserRequests';

function Widgets({
  chat,
}: {
  chat: ChatType;
}) {
  return (
    <>
      {chat?.function === 'fetch_scheduled_interviews' ? (
        <FetchScheduledInterviews chat={chat} />
      ) : chat?.function === 'fetch_user_requests' ? (
        <UserRequests chat={chat} />
      ) : chat?.function === 'fetch_candidate_declined_interviews' ? (
        <FetchDeclinedInterviews chat={chat} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Widgets;
