import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Check, Inbox } from 'lucide-react';

import { CreateRequestWidget } from '../createRequestWidget';

export const RequestEmpty = () => {
  return (
    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
      <div className='col-span-1 md:col-span-2'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle className='text-center text-lg font-semibold'>
              No Requests Yet
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col items-center'>
            <Inbox className='mb-4 h-24 w-24 text-gray-400' />
            <div className='flex flex-col gap-2 items-center justify-center'>
            <p className='mb-4 text-center text-gray-600'>
              You haven&apos;t created any requests yet.
              <br />
              Start by creating a new request to get things rolling!
            </p>
            <CreateRequestWidget />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='col-span-1'>
        <Card className='h-full w-full'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {[
                'Set up your job titles and descriptions.',
                'Add candidates and their contact info.',
                'Invite candidates to self-schedule interviews',
                'Monitor and manage',
                'Monitor and manage interview requests efficiently.',
              ].map((item, index) => (
                <li key={index} className='flex items-center'>
                  <Check
                    className={`mr-2 h-5 w-5 ${index < 2 ? 'text-green-500' : 'text-gray-300'}`}
                  />
                  <span className={index < 2 ? 'text-gray-500' : ''}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className='col-span-1'>
        <Card className='h-full w-full'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              System Setup Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {[
                'Keep interviewer availability up to date.',
                'Verify time zones and locations for all interviewers.',
                'Review communication templates.',
                'Review Slack setup.',
                'Set up and review debrief or retrospective meetings.',
              ].map((item, index) => (
                <li key={index} className='flex items-center'>
                  <Check
                    className={`mr-2 h-5 w-5 ${index < 2 ? 'text-green-500' : 'text-gray-300'}`}
                  />
                  <span className={index < 2 ? 'text-gray-500' : ''}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
