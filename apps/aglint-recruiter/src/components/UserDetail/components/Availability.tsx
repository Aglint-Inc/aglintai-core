import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { Lightbulb } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
export const Availability = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability & AI Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Weekly Hours
            </h3>
            <p className='text-xl font-bold'>
              {interviewer.availability.weeklyHours} hours
            </p>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Preferred Times
            </h3>
            <div className='space-y-1'>
              {interviewer.availability.preferredTimes.map((time, index) => (
                <Badge key={index} variant='secondary'>
                  {time}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Unavailable Dates
            </h3>
            <div className='space-y-1'>
              {interviewer.availability.unavailableDates.map((date, index) => (
                <Badge key={index} variant='outline'>
                  {date}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              AI Instructions
            </h3>
            <div className='bg-purple-100 p-4 rounded-lg'>
              <div className='flex items-center space-x-2 text-purple-800 mb-2'>
                <Lightbulb className='h-5 w-5' />
                <h4 className='font-semibold'>Personalized AI Tips</h4>
              </div>
              <p className='text-sm text-purple-700 mb-4'>
                Get AI-powered suggestions to improve your interviewing skills
                and optimize your availability.
              </p>
              <UIButton className='w-full bg-purple-600 hover:bg-purple-700 text-white'>
                Get AI Instructions
              </UIButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
