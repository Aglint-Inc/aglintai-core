import React, { useState } from 'react';

import { ReqCompleted } from '@/devlink2/ReqCompleted';
import { Text } from '@/devlink2/Text';
import { TextWithIcon } from '@/devlink2/TextWithIcon';

function CompletedRequestsBox({
  completedRequest,
}: {
  completedRequest: any[];
}) {
  const [openCompleted, setOpenCompleted] = useState(false);

  return (
    <ReqCompleted
      isDetailListVisible={completedRequest.length && openCompleted}
      onClickArrow={{
        onClick: () => setOpenCompleted(!openCompleted),
      }}
      textTitle={
        <Text
          color={completedRequest.length ? 'success' : 'neutral'}
          content={
            completedRequest.length
              ? `${completedRequest?.length} Requests completed 🎉`
              : 'Looks like there is no completed requests 😴'
          }
        />
      }
      textDesc={
        Boolean(completedRequest.length) &&
        `View detailed list of completed requests`
      }
      slotTextwithIcon={completedRequest.map((ele, i) => {
        return (
          <TextWithIcon
            key={i}
            textContent={ele.title}
            color={'neutral'}
            iconSize={4}
            iconName={'event_available'}
          />
        );
      })}
    />
  );
}

export default CompletedRequestsBox;
