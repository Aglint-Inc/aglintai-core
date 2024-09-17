import { dayjsLocal } from '@aglint/shared-utils';
import { Card, CardContent } from '@components/ui/card';
import { Star } from 'lucide-react';
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

  const filteredData =
    data?.filter((app) =>
      app.candidate.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <>
      <div className='flex justify-between'>
        <UITextField
          placeholder='Search Candidates...'
          className='max-w-sm bg-white'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Card>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                {Object.keys(headers).map((key) => (
                  <th
                    key={key}
                    className='p-4 text-left text-sm font-medium text-gray-700'
                  >
                    {headers[key]}
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
                        No data found
                      </td>
                    </tr>
                  )}
                  {filteredData.map((feedback, index) => (
                    <tr
                      key={index}
                      className='border-b last:border-b-0 hover:bg-gray-50'
                    >
                      <td className='p-4 text-gray-900'>
                        {feedback.candidate}
                      </td>
                      <td className='p-4 text-gray-700'>
                        {feedback.interviewer}
                      </td>
                      <td className='p-4 text-gray-700'>
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
                      <td className='p-4 text-gray-700'>
                        {feedback.objective || '--'}
                      </td>
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
