import { Card, CardContent } from '@components/ui/card';
import React from 'react';

import DeclineLeadTimeChart from './DeclineLeadTimeChart';
import HistoricInterviews from './HistoricInterviews';
import InterviewCountByTimeFrame from './InterviewCountByTimeFrame';

const InterviewCount = () => {
  return (
    <>
      <Card>
        <CardContent>
          <div className='space-y-8'>
            <InterviewCountByTimeFrame />
            <HistoricInterviews />
          </div>
        </CardContent>
      </Card>
      <DeclineLeadTimeChart />
    </>
  );
};

export default InterviewCount;
