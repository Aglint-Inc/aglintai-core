import React from 'react';

import DeclineLeadTimeChart from './DeclineLeadTimeChart';
import HistoricInterviews from './HistoricInterviews';
import InterviewCountByTimeFrame from './InterviewCountByTimeFrame';

const InterviewCount = () => {
  return (
    <div className='flex flex-col gap-4 pb-4'>
      <InterviewCountByTimeFrame />
      <HistoricInterviews />
      <DeclineLeadTimeChart />
    </div>
  );
};

export default InterviewCount;
