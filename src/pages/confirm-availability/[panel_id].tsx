import React from 'react';

import SchedulingConfirm from '@/src/components/SchedulingConfirm/SchedulingConfirm';

const ConfirmAvailability = () => {
  return (
    <div>
      <SchedulingConfirm />
    </div>
  );
};

ConfirmAvailability.getLayout = (page) => {
  return <>{page}</>;
};

export default ConfirmAvailability;
