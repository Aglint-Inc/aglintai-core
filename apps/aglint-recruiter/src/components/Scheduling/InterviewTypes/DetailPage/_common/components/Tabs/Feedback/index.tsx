import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { MoreVertical, Plus, Search, Star, ThumbsUp } from 'lucide-react';
import React from 'react';

function Feedback() {
  return (
    <div>
      <div className='flex justify-between'>
        <Input
          placeholder='Search feedback...'
          className='max-w-sm bg-white'
          startAdornment={<Search className='h-4 w-4 text-gray-400' />}
        />
        <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
          <Plus className='h-4 w-4 mr-2' />
          Request Feedback
        </Button>
      </div>
      <Card>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                <th className='text-left p-4 text-gray-600'>Candidate</th>
                <th className='text-left p-4 text-gray-600'>Interviewer</th>
                <th className='text-left p-4 text-gray-600'>Interview Date</th>
                <th className='text-left p-4 text-gray-600'>
                  Candidate Experience
                </th>
                <th className='text-left p-4 text-gray-600'>
                  Interviewer Rating
                </th>
                <th className='text-left p-4 text-gray-600'>Comments</th>
                <th className='text-left p-4 text-gray-600'></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  candidate: 'John Doe',
                  interviewer: 'Vivek Singh Mongre',
                  date: '2023-08-10',
                  experience: 4.5,
                  rating: 4.8,
                  comments: 'Great technical discussion',
                },
                {
                  candidate: 'Jane Smith',
                  interviewer: 'Sara Connor',
                  date: '2023-08-11',
                  experience: 4.2,
                  rating: 4.5,
                  comments: 'Insightful HR interview',
                },
                {
                  candidate: 'Alice Johnson',
                  interviewer: 'Dileep B C',
                  date: '2023-08-12',
                  experience: 4.8,
                  rating: 4.9,
                  comments: 'Excellent system design challenge',
                },
                {
                  candidate: 'Bob Williams',
                  interviewer: 'Raimon Simon',
                  date: '2023-08-13',
                  experience: 4.0,
                  rating: 4.3,
                  comments: 'Good behavioral questions',
                },
              ].map((feedback, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0 hover:bg-gray-50'
                >
                  <td className='p-4 text-gray-900'>{feedback.candidate}</td>
                  <td className='p-4 text-gray-700'>{feedback.interviewer}</td>
                  <td className='p-4 text-gray-700'>{feedback.date}</td>
                  <td className='p-4'>
                    <div className='flex items-center text-green-600'>
                      <ThumbsUp className='h-4 w-4 mr-2' />
                      {feedback.experience}
                    </div>
                  </td>
                  <td className='p-4'>
                    <div className='flex items-center text-yellow-600'>
                      <Star className='h-4 w-4 mr-2' />
                      {feedback.rating}
                    </div>
                  </td>
                  <td className='p-4 text-gray-700'>{feedback.comments}</td>
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

export default Feedback;
