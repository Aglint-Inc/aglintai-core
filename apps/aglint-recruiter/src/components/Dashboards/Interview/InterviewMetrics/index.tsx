import React from 'react';

import DeclineLeadTimeChart from './DeclineLeadTimeChart';
import HistoricInterviews from './HistoricInterviews';
import InterviewCountByTimeFrame from './InterviewCountByTimeFrame';

const InterviewCount = () => {
  return (
    <>
      <InterviewCountByTimeFrame />
      <HistoricInterviews />
      <DeclineLeadTimeChart />
    </>
  );
};

export default InterviewCount;
