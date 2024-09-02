import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function InterviewCard({ interviewData }: { interviewData: any }) {
  return (
    <div>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-stretch space-x-6'>
            <div className='flex flex-col items-center justify-center bg-gray-100 py-3 rounded-lg w-28'>
              <span className='text-sm font-medium text-gray-500'>
                {interviewData.month}
              </span>
              <span className='text-4xl font-medium my-1'>
                {interviewData.date}
              </span>
              <span className='text-sm font-medium text-gray-500'>
                {interviewData.day}
              </span>
            </div>
            <div className='flex-1 flex flex-col justify-center space-y-2'>
              <div className='flex items-center gap-2'>
                <h2 className='text-xl font-semibold'>{interviewData.type}</h2>
                <Badge variant={'secondary'} className='font-normal rounded-md'>
                  {interviewData.status}
                </Badge>
              </div>

              <p className='text-gray-500'>{interviewData.time}</p>
              <div className='flex space-x-2 mt-4'>
                {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Join With Google Meet
                </Button> */}
                {interviewData.status === 'Upcoming' && (
                  <Button className='bg-primary text-primary-foreground hover:bg-primary/90'>
                    Join With Google Meet
                  </Button>
                )}
                <Button variant='outline'>Schedule Info</Button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardContent>
          <p className='text-sm text-gray-600 mb-4'>Interviewers</p>
          {interviewData.interviewers.map((interviewer: any, index: any) => (
            <div className='flex items-center gap-2 mt-4' key={index}>
              <Avatar className='w-10 h-10 rounded-md overflow-hidden'>
                <AvatarImage src={interviewer.image} alt={interviewer.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className='font-medium'>{interviewer.name}</div>
                <div className='text-sm text-gray-600'>{interviewer.role}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default InterviewCard;
