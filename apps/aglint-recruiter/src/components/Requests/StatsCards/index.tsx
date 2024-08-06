import React from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestOption } from '@/devlink2/RequestOption';

function StatsCards() {
  
  const dummyStatusData = [
    { text: 'Urgent Requests:', number: 10 },
    { text: 'Pending Requests:', number: 20 },
    { text: 'Total Requests:', number: 30 },
  ];

  return (
    <>
      {dummyStatusData.map(({ number, text }, i) => {
        return (
          <RequestOption
            key={text ?? i}
            textOption={text}
            slotCountBadge={<GlobalBadge textBadge={number} />}
          />
        );
      })}
    </>
  );
}

export default StatsCards;
