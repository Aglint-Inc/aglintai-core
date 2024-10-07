'use client';
import React from 'react';

import DeclineLeadTimeChart from './DeclineLeadTimeChart';
import HistoricInterviews from './HistoricInterviews';
import InterviewCountByTimeFrame from './InterviewCountByTimeFrame';

const InterviewCount = () => {
  return (
    <div className='flex flex-col space-y-16'>
      <InterviewCountByTimeFrame />
      <HistoricInterviews />
      <DeclineLeadTimeChart />
    </div>
  );
};

export default InterviewCount;
