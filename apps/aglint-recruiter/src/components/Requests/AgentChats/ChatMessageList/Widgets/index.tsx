
import { useUserChat } from '@/src/queries/userchat';

import FetchScheduledInterviews from './FetchScheduledInterviews';
import UserRequests from './UserRequests';

function Widgets({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  return (
    <>
      {chat?.function === 'fetch_scheduled_interviews' ? (
        <FetchScheduledInterviews chat={chat} />
      ) : chat?.function === 'fetch_user_requests' ? (
        <UserRequests chat={chat} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Widgets;
