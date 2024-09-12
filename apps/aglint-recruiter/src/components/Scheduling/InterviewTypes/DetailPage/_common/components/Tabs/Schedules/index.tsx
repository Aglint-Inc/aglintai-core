import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Badge, Clock, MoreVertical, Plus, Settings } from 'lucide-react';
import React from 'react';

function Schedules() {
  return (
    <div>
      <div className='flex justify-between'>
        <Input type='date' className='max-w-sm bg-white' />
        <div className='space-x-2'>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
            <Plus className='h-4 w-4 mr-2' />
            Schedule Interview
          </Button>
          <Button
            variant='outline'
            className='border-blue-300 text-blue-700 hover:bg-blue-50'
          >
            <Settings className='h-4 w-4 mr-2' />
            Aglint AI Preferences
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                <th className='text-left p-4 text-gray-600'>Time</th>
                <th className='text-left p-4 text-gray-600'>Candidate</th>
                <th className='text-left p-4 text-gray-600'>Position</th>
                <th className='text-left p-4 text-gray-600'>Interviewer</th>
                <th className='text-left p-4 text-gray-600'>Type</th>
                <th className='text-left p-4 text-gray-600'>Status</th>
                <th className='text-left p-4 text-gray-600'></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  time: '09:00 AM',
                  candidate: 'John Doe',
                  position: 'Senior DevOps Engineer',
                  interviewer: 'Vivek Singh Mongre',
                  type: 'Technical',
                  status: 'Scheduled',
                },
                {
                  time: '11:00 AM',
                  candidate: 'Jane Smith',
                  position: 'DevOps Specialist',
                  interviewer: 'Sara Connor',
                  type: 'HR',
                  status: 'In Progress',
                },
                {
                  time: '02:00 PM',
                  candidate: 'Alice Johnson',
                  position: 'Site Reliability Engineer',
                  interviewer: 'Dileep B C',
                  type: 'System Design',
                  status: 'Pending',
                },
                {
                  time: '04:00 PM',
                  candidate: 'Bob Williams',
                  position: 'Cloud Infrastructure Engineer',
                  interviewer: 'Raimon Simon',
                  type: 'Behavioral',
                  status: 'Scheduled',
                },
              ].map((interview, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0 hover:bg-gray-50'
                >
                  <td className='p-4'>
                    <div className='flex items-center text-gray-700'>
                      <Clock className='h-4 w-4 mr-2 text-gray-400' />
                      {interview.time}
                    </div>
                  </td>
                  <td className='p-4 text-gray-900'>{interview.candidate}</td>
                  <td className='p-4 text-gray-700'>{interview.position}</td>
                  <td className='p-4 text-gray-700'>{interview.interviewer}</td>
                  <td className='p-4'>
                    <Badge
                      variant='outline'
                      className='border-green-300 text-green-700'
                    >
                      {interview.type}
                    </Badge>
                  </td>
                  <td className='p-4'>
                    <Badge
                      variant={
                        interview.status === 'Scheduled'
                          ? 'success'
                          : interview.status === 'In Progress'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {interview.status}
                    </Badge>
                  </td>
                  <td className='p-4'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-gray-500 hover:text-gray-700'
                    >
                      <MoreVertical className='h-4 w-4' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Schedules;
