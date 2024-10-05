import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';

function TrainingOverview() {
  return (
    <Card className='border-t-4 border-t-orange-500 bg-white shadow-md'>
      <CardHeader>
        <CardTitle className='text-gray-800'>Training Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Interviewers in Training</span>
            <span className='font-bold text-gray-900'>5</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Completed Trainings</span>
            <span className='font-bold text-green-600'>12</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Avg. Training Duration</span>
            <span className='font-bold text-gray-900'>4 weeks</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Training Satisfaction</span>
            <span className='font-bold text-gray-900'>4.8 / 5.0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrainingOverview;
