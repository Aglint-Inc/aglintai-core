import { dayjsLocal } from '@aglint/shared-utils';
import { EmptyState } from '@components/empty-state';
import { Card, CardContent } from '@components/ui/card';
import { MessageSquare, Star } from 'lucide-react';
import { useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import UITextField from '@/components/Common/UITextField';

import { usePoolFeedbacks } from '../../../hooks/usePoolFeedback';

function Feedback() {
  const { data, isLoading } = usePoolFeedbacks();
  const [search, setSearch] = useState('');

  const headers = {
    candidate: 'Candidate',
    interviewer: 'Interviewer',
    date: 'Interview Date',
    rating: 'Interviewer Rating',
    comments: 'Comments',
  };

  let filteredData =
    data?.filter((app) =>
      app.candidate.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  filteredData = [
    {
      recommendation: 4,
      objective:
        "Assess candidate's technical skills for frontend development.",
      interviewer: 'John Doe',
      interview_date: '2024-10-18',
      candidate: 'Jane Smith',
    },
    {
      recommendation: 3,
      objective: 'asdfasdfasdf',
      interviewer: 'Emily Johnson',
      interview_date: null,
      candidate: 'Alex Turner',
    },
  ];

  return (
    <>
      <div className='mb-4 flex justify-between'>
        <UITextField
          placeholder='Search Candidates...'
          className='w-64'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Card className='overflow-hidden border border-border'>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead className='bg-muted'>
              <tr className='border border-border'>
                {Object.keys(headers).map((key) => (
                  <th
                    key={key}
                    className='p-4 text-left text-sm font-medium text-muted-foreground'
                  >
                    {headers[key as keyof typeof headers]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className='p-4'>
                    <div>
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={5} className='p-4'>
                        <EmptyState
                          icon={MessageSquare}
                          header={'No feedback found'}
                          description='Create a new interview pool to get started.'
                        />
                      </td>
                    </tr>
                  )}
                  {filteredData.map((feedback, index) => (
                    <tr
                      key={index}
                      className='border border-border last:border-b-0'
                    >
                      <td className='p-4'>{feedback.candidate}</td>
                      <td className='p-4'>{feedback.interviewer}</td>
                      <td className='p-4'>
                        {dayjsLocal(feedback.interview_date).format(
                          'DD MMM YYYY',
                        )}
                      </td>
                      <td className='p-4'>
                        <div className='flex items-center text-yellow-600'>
                          <Star className='mr-2 h-4 w-4' />
                          {feedback.recommendation}
                        </div>
                      </td>
                      <td className='p-4'>{feedback.objective || '--'}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}

export default Feedback;
