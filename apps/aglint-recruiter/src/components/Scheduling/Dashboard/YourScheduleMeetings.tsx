import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import dayjs from 'dayjs';
import { Clock } from 'lucide-react';
import React from 'react';

import { capitalizeAll } from '@/utils/text/textUtils';

type YourScheduleMeetingsType = {
  meetings: {
    candidate: {
      name: string;
      image: string;
    };
    meetingClient: {
      icon: string;
      name: string;
    };
    meetingName: string;
    time: {
      start: string;
      end: string;
    };
  }[];
  onClickViewSchedules: () => void;
};

const YourScheduleMeetings = ({
  meetings,
  onClickViewSchedules,
}: YourScheduleMeetingsType) => {
  return (
    <>
      <Card className='w-full'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Your Schedules</CardTitle>
          <Button variant='outline' onClick={onClickViewSchedules}>
            View All Schedules
          </Button>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-4'>
            {meetings.map((item, index) => {
              const date = new Date(item.time.start);
              const meetingDay = dayjs(date).format('ddd');
              const meetingDate = date.getDate();
              const month = dayjs(date).format('MMMM');
              const meetTime = `${dayjs(item.time.start).format('hh:mm A')} to ${dayjs(item.time.end).format('hh:mm A')}`;

              return (
                <Card key={index} className='flex items-center p-4'>
                  <div className='flex-shrink-0 mr-4 text-center'>
                    <div className='text-lg font-semibold'>{meetingDay}</div>
                    <div className='text-3xl font-bold'>{meetingDate}</div>
                    <div className='text-sm'>{month}</div>
                  </div>
                  <div className='flex-grow'>
                    <div className='flex items-center mb-2'>
                      <Avatar className='h-10 w-10 mr-2'>
                        <AvatarImage
                          src={item.candidate.image}
                          alt={item.candidate.name}
                        />
                        <AvatarFallback>
                          {item.candidate.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-semibold'>
                          {capitalizeAll(item.candidate.name)}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {item.meetingName}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <Clock className='w-4 h-4 mr-1' />
                      {meetTime}
                    </div>
                    <div className='flex items-center mt-2'>
                      <Avatar className='h-6 w-6 mr-2'>
                        <AvatarImage
                          src={item.meetingClient.icon}
                          alt={item.meetingClient.name}
                        />
                        <AvatarFallback>
                          {item.meetingClient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-sm'>
                        {capitalizeAll(item.meetingClient.name)}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default YourScheduleMeetings;
