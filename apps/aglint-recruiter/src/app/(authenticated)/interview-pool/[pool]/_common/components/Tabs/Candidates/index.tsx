import { Card, CardContent } from '@components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import { useRouterPro } from '@/hooks/useRouterPro';
import { usePoolCandidates } from '@/interview-pool/details/hooks/useCandidateModule';
import ROUTES from '@/utils/routing/routes';

function Candidates() {
  const router = useRouterPro();
  const { data, isLoading } = usePoolCandidates();
  const [search, setSearch] = useState('');

  const headers = {
    name: 'Name',
    position: 'Position',
    stage: 'Stage',
    nextInterview: 'Next Interview',
    score: 'Score',
    actions: '',
  };

  const filteredData =
    data?.filter((app) =>
      app.name.toLowerCase().includes(search.toLowerCase()),
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
                    <Loader />
                  </td>
                </tr>
              ) : (
                <>
                  {' '}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={6} className='p-4'>
                        <span>No candidates found</span>
                      </td>
                    </tr>
                  )}
                  {filteredData.map((app, index) => (
                    <tr
                      key={index}
                      className='border-b last:border-b-0 hover:bg-gray-50'
                    >
                      <td className='p-4'>
                        <div className='font-medium text-gray-900'>
                          {app.name}
                        </div>
                      </td>
                      <td className='p-4 text-gray-700'>{app.job_title}</td>
                      <td className='p-4'>{app.stage}</td>
                      <td className='p-4 text-gray-700'>{app.nextInterview}</td>
                      <td className='p-4'>
                        <UIBadge
                          color={
                            app.score >= 9
                              ? 'success'
                              : app.score >= 7
                                ? 'warning'
                                : 'secondary'
                          }
                          textBadge={app.score}
                        />
                      </td>

                      <td className='p-4'>
                        <UIButton
                          variant='outline'
                          size='sm'
                          icon={<ArrowRight className='h-4 w-4' />}
                          onClick={() => {
                            router.push(
                              ROUTES['/jobs/[job]/[application]']({
                                job: app.job_id,
                                application_id: app.id,
                              }) + '?tab=interview',
                            );
                          }}
                        />
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

export default Candidates;
