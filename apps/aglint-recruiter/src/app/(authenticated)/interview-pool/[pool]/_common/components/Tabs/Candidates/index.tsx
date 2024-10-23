import { EmptyState } from '@components/empty-state';
import { Card, CardContent } from '@components/ui/card';
import { UIBadge } from '@components/ui-badge';
import { ArrowRight, User } from 'lucide-react';
import { useState } from 'react';

import { Loader } from '@/components/Common/Loader';
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
      <div className='mb-4 flex justify-between'>
        <UITextField
          placeholder='Search Candidates...'
          className='w-64'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Card className='overflow-hidden border border-border'>
        <CardContent className='overflow-hidden p-0'>
          <table className='w-full'>
            <thead className='bg-muted'>
              <tr className='border-b border-border'>
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
                    <Loader />
                  </td>
                </tr>
              ) : (
                <>
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={6} className='p-4'>
                        <div>
                          <EmptyState
                            header={'No candidates found'}
                            description='This section lists all candidates across all jobs taken this interview.'
                            icon={User}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                  {filteredData.map((app, index) => (
                    <tr
                      key={index}
                      className='border border-border last:border-b-0 hover:bg-muted/50'
                    >
                      <td className='p-4'>
                        <div className='font-medium'>{app.name}</div>
                      </td>
                      <td className='p-4'>{app.job_title}</td>
                      <td className='p-4'>{app.stage}</td>
                      <td className='p-4'>{app.nextInterview}</td>
                      <td className='p-4'>
                        <UIBadge
                          variant={
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
