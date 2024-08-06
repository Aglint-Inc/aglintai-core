import React from 'react';

import { useUserChat } from '@/src/queries/userchat';

import FetchScheduledInterviews from './FetchScheduledInterviews';

function Widgets({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  return (
    <>
      {chat?.function === 'fetch_scheduled_interviews' ? (
        <FetchScheduledInterviews chat={chat} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Widgets;
