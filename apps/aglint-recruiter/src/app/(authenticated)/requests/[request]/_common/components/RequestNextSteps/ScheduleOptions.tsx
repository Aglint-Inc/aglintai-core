import React from 'react';

import { type NextStepEventType } from '../RequestProgress/types';
import { requestNextStepMap } from '../RequestProgress/utils/requestNextStepMap';

const ScheduleOptions = ({ nextStep }: { nextStep: NextStepEventType }) => {
  const NextStepComp = requestNextStepMap[nextStep];
  return (
    <div className='mt-2 flex flex-col'>
      <NextStepComp />
    </div>
  );
};
export default ScheduleOptions;
