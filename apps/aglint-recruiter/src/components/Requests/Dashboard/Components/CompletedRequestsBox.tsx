import React, { useState } from 'react';

import { ReqCompleted } from '@/devlink2/ReqCompleted';
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
        completedRequest.length
          ? `${completedRequest?.length} Requests completed 🎉`
          : 'Looks like there is no completed requests 😴'
      }
      textDesc={`View detailed list of completed requests`}
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
