import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/ui/avatar';
import { Button } from '../../shadcn/ui/button';
import { Card, CardContent, CardHeader } from '../../shadcn/ui/card';

const interviewData = {
  "date": "August 24 Sunday ",
  "time": "09:00 AM - 09:45 AM PT",
  "type": "Recruiter initial call",
  "interviewers": [
    {
      "name": "Jane Margeret",
      "role": "Recruiter",
      "image": "/images/user-1.jpg"
    },
    {
      "name": "John D Sandrus",
      "role": "HR Manager",
      "image": "/images/user-2.jpg"
    }
  ]
};

function UpcomingInterview() {
  return (
    <div>
      <Card className="bg-background/80 backdrop-blur-sm shadow-sm border border-border">
        <CardHeader>
          <h3 className='text-xl font-semibold'>Upcoming Interview</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">{interviewData.date}</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{interviewData.time}</div>
              <div className="text-sm text-gray-600">{interviewData.type}</div>
            </div>
          </div>
          {interviewData.interviewers.map((interviewer, index) => (
            <div className="flex items-center gap-2 mt-4" key={index}>
              <Avatar className='w-10 h-10 rounded-md overflow-hidden'>
                <AvatarImage src={interviewer.image} alt={interviewer.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{interviewer.name}</div>
                <div className="text-sm text-gray-600">{interviewer.role}</div>
              </div>
            </div>
          ))}
          <div className="flex w-full gap-2">
            <Button className="w-full mt-4">
              Schedule Info
            </Button>
            <Button className="w-full mt-4" variant="outline">
              Join meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpcomingInterview;
