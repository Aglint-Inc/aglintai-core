/* eslint-disable security/detect-object-injection */
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Lightbulb, Loader2 } from 'lucide-react';
import React from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useGreenhouseDetails } from '@/queries/greenhouse';
import { api } from '@/trpc/client';

dayjs.extend(relativeTime);

function GreenhouseSettings() {
  const { recruiter } = useAuthDetails();
  const { mutateAsync: getGreenhouseSync } =
    api.ats.greenhouse.fullSync.useMutation();
  const { data, isPending, setOptions, refetch } = useGreenhouseDetails();
  const timeStamp = data && data.last_sync['full_sync'];
  const last_sync = timeStamp ? dayjs(timeStamp).fromNow() : 'Never';

  const syncOptions = [
    { key: 'jobs', label: 'Jobs' },
    { key: 'interview_stages', label: 'Interview Plan' },
    { key: 'candidates', label: 'Candidates' },
    { key: 'applications', label: 'Applications' },
    { key: 'departments', label: 'Departments' },
    { key: 'office_locations', label: 'Office Locations' },
    { key: 'users', label: 'Users' },
  ];

  return (
    <div className='container mt-10 space-y-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-x-4'>
          <CardTitle className='text-lg'>Sync Entities</CardTitle>
          <Badge variant='outline' className='bg-green-50 text-green-700'>
            Connected
          </Badge>
        </CardHeader>
        <CardContent>
          <p className='mb-4 text-sm text-gray-500'>
            Select the entities you want to sync: Jobs, Interview Plans,
            Candidates, Applications, Users, Office Locations, and Departments.
          </p>
          {isPending ? (
            <div className='flex items-center justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-primary' />
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                {syncOptions.map(({ key, label }) => (
                  <div key={key} className='flex items-center space-x-2'>
                    <Checkbox
                      id={key}
                      checked={data?.options[key]}
                      onCheckedChange={() => {
                        setOptions({
                          ...data,
                          options: {
                            ...data.options,
                            [key]: !data.options[key],
                          },
                        });
                      }}
                    />
                    <label
                      htmlFor={key}
                      className='text-sm font-medium leading-none'
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              <div className='mt-4 flex items-center justify-between rounded-md bg-gray-100 p-4'>
                <p className='text-sm text-gray-500'>{`Last synchronized on: ${last_sync}`}</p>
                <Button
                  size='sm'
                  onClick={() => {
                    if (recruiter && recruiter.id)
                      getGreenhouseSync({ recruiter_id: recruiter.id }).then(
                        () => refetch(),
                      );
                  }}
                >
                  Sync Now
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>AI Task Automation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='mb-4 flex items-start space-x-2'>
            <Checkbox
              id='task_sync'
              checked={data?.options['task_sync']}
              onCheckedChange={() => {
                setOptions({
                  ...data,
                  options: {
                    ...data.options,
                    task_sync: !data.options.task_sync,
                  },
                });
              }}
              className='mt-1'
            />
            <div>
              <label htmlFor='task_sync' className='text-sm font-medium'>
                Use Aglint AI to automate tasks directly from comments in
                Greenhouse.
              </label>
              <p className='mt-1 text-sm text-gray-500'>
                Mention `@aglintai` in a comment, then include the task details.
                Aglint AI will handle the rest.
              </p>
            </div>
          </div>
          <Alert>
            <AlertTitle className='flex items-center'>
              <Lightbulb className='mr-2 h-4 w-4 text-purple-500' />
              How to Use:
            </AlertTitle>
            <AlertDescription>
              <ol className='mt-2 list-inside list-decimal space-y-2 text-sm'>
                <li>Mention `@aglintai` in your comment.</li>
                <li>
                  Specify the action, like creating, rescheduling, or canceling
                  a request.
                </li>
              </ol>
              <p className='mt-4 text-sm font-medium'>Example:</p>
              <p className='text-sm italic'>
                @aglintai Please create a request for a new interview and assign
                it to the scheduling coordinator.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export default GreenhouseSettings;

// async function getGreenhouseSync(
//   syncData: GreenHouseFullSyncAPI['request']['syncData'],
// ) {
//   const res = await axios.call<GreenHouseFullSyncAPI>(
//     'POST',
//     '/api/sync/greenhouse/full_sync',
//     {
//       syncData,
//     },
//   );
//   return res;
// }
