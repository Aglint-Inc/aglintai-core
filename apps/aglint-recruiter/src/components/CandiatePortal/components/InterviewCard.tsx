import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import React from 'react';

function InterviewCard({ interviewData }: { interviewData: any }) {
  return (
    <div>
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-stretch space-x-6'>
            <div className='flex w-28 flex-col items-center justify-center rounded-lg bg-gray-100 py-3'>
              <span className='text-sm font-medium text-gray-500'>
                {interviewData.month}
              </span>
              <span className='my-1 text-4xl font-medium'>
                {interviewData.date}
              </span>
              <span className='text-sm font-medium text-gray-500'>
                {interviewData.day}
              </span>
            </div>
            <div className='flex flex-1 flex-col justify-center space-y-2'>
              <div className='flex items-center gap-2'>
                <h2 className='text-xl font-semibold'>{interviewData.type}</h2>
                <Badge variant={'secondary'} className='rounded-md font-normal'>
                  {interviewData.status}
                </Badge>
              </div>

              <p className='text-gray-500'>{interviewData.time}</p>
              <div className='mt-4 flex space-x-2'>
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
          <p className='mb-4 text-sm text-gray-600'>Interviewers</p>
          {interviewData.interviewers.map((interviewer: any, index: any) => (
            <div className='mt-4 flex items-center gap-2' key={index}>
              <Avatar className='h-10 w-10 overflow-hidden rounded-md'>
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
