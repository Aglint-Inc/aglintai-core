import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import React from 'react';

function StatsCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
      <Card className='bg-white border-t-4 border-t-blue-500 shadow-md'>
        <CardHeader>
          <CardTitle className='text-gray-800'>Interview Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Total Interviews</span>
              <span className='font-bold text-gray-900'>145</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Completion Rate</span>
              <span className='font-bold text-green-600'>92%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Avg. Duration</span>
              <span className='font-bold text-gray-900'>58 mins</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Avg. Time to Schedule</span>
              <span className='font-bold text-gray-900'>2.3 days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-white border-t-4 border-t-purple-500 shadow-md'>
        <CardHeader>
          <CardTitle className='text-gray-800'>Candidate Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Applied</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>210</span>
                <Progress
                  value={100}
                  className='w-[60px] bg-purple-100'
                  indicatorClassName='bg-purple-500'
                />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Screened</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>180</span>
                <Progress
                  value={86}
                  className='w-[60px] bg-purple-100'
                  indicatorClassName='bg-purple-500'
                />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Interviewed</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>145</span>
                <Progress
                  value={69}
                  className='w-[60px] bg-purple-100'
                  indicatorClassName='bg-purple-500'
                />
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-600'>Offered</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>12</span>
                <Progress
                  value={6}
                  className='w-[60px] bg-purple-100'
                  indicatorClassName='bg-purple-500'
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-white border-t-4 border-t-green-500 shadow-md'>
        <CardHeader>
          <CardTitle className='text-gray-800'>
            Interviewer Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Avg. Rating</span>
              <span className='font-bold text-gray-900'>4.7 / 5.0</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>On-time Rate</span>
              <span className='font-bold text-green-600'>98%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Feedback Timeliness</span>
              <span className='font-bold text-amber-600'>89%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>
                Hire Recommendation Accuracy
              </span>
              <span className='font-bold text-gray-900'>76%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='bg-white border-t-4 border-t-orange-500 shadow-md'>
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
    </div>
  );
}

export default StatsCards;
