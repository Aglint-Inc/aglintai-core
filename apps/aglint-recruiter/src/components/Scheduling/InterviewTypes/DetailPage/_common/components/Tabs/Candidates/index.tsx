import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { TabsContent } from '@devlink/_Builtin';
import { Badge, MoreVertical, Plus, Search } from 'lucide-react';
import React from 'react';

function Candidates() {
  return (
    <>
      <div className='flex justify-between'>
        <Input
          placeholder='Search candidates...'
          className='max-w-sm bg-white'
          startAdornment={<Search className='h-4 w-4 text-gray-400' />}
        />
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Plus className='h-4 w-4 mr-2' />
          Add Candidate
        </Button>
      </div>
      <Card>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                <th className='text-left p-4 text-gray-600'>Name</th>
                <th className='text-left p-4 text-gray-600'>Position</th>
                <th className='text-left p-4 text-gray-600'>Stage</th>
                <th className='text-left p-4 text-gray-600'>Next Interview</th>
                <th className='text-left p-4 text-gray-600'>Score</th>
                <th className='text-left p-4 text-gray-600'>
                  Time to Schedule
                </th>
                <th className='text-left p-4 text-gray-600'></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'John Doe',
                  position: 'Senior DevOps Engineer',
                  stage: 'Technical Interview',
                  nextInterview: '2023-08-15',
                  score: 8.5,
                  timeToSchedule: '1 day',
                },
                {
                  name: 'Jane Smith',
                  position: 'DevOps Specialist',
                  stage: 'HR Interview',
                  nextInterview: '2023-08-16',
                  score: 7.8,
                  timeToSchedule: '3 days',
                },
                {
                  name: 'Alice Johnson',
                  position: 'Site Reliability Engineer',
                  stage: 'Final Interview',
                  nextInterview: '2023-08-17',
                  score: 9.2,
                  timeToSchedule: '2 days',
                },
                {
                  name: 'Bob Williams',
                  position: 'Cloud Infrastructure Engineer',
                  stage: 'Offer Stage',
                  nextInterview: '-',
                  score: 9.5,
                  timeToSchedule: '1 day',
                },
              ].map((candidate, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0 hover:bg-gray-50'
                >
                  <td className='p-4'>
                    <div className='font-medium text-gray-900'>
                      {candidate.name}
                    </div>
                  </td>
                  <td className='p-4 text-gray-700'>{candidate.position}</td>
                  <td className='p-4'>
                    <Badge
                      variant='outline'
                      className='border-purple-300 text-purple-700'
                    >
                      {candidate.stage}
                    </Badge>
                  </td>
                  <td className='p-4 text-gray-700'>
                    {candidate.nextInterview}
                  </td>
                  <td className='p-4'>
                    <Badge
                      variant={
                        candidate.score >= 9
                          ? 'success'
                          : candidate.score >= 7
                            ? 'warning'
                            : 'destructive'
                      }
                    >
                      {candidate.score}
                    </Badge>
                  </td>
                  <td className='p-4 text-gray-700'>
                    {candidate.timeToSchedule}
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
    </>
  );
}

export default Candidates;
