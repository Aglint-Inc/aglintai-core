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

import { type GreenHouseFullSyncAPI } from '@/api/sync/greenhouse/full_sync/type';
import axios from '@/client/axios';
import { useGreenhouseDetails } from '@/queries/greenhouse';

dayjs.extend(relativeTime);

function GreenhouseSettings() {
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
    <div className='container mx-auto max-w-3xl mt-10 space-y-4'>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center space-x-4'>
          <CardTitle className='text-lg'>Sync Entities</CardTitle>
          <Badge variant='outline' className='bg-green-50 text-green-700'>
            Connected
          </Badge>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-gray-500 mb-4'>
            Select the entities you want to sync: Jobs, Interview Plans,
            Candidates, Applications, Users, Office Locations, and Departments.
          </p>
          {isPending ? (
            <div className='flex justify-center items-center'>
              <Loader2 className='w-6 h-6 animate-spin text-primary' />
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
              <div className='flex items-center justify-between mt-4 bg-gray-100 p-4 rounded-md'>
                <p className='text-sm text-gray-500'>{`Last synchronized on: ${last_sync}`}</p>
                <Button
                  size='sm'
                  onClick={() => getGreenhouseSync(data).then(() => refetch())}
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
          <div className='flex items-start space-x-2 mb-4'>
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
              <p className='text-sm text-gray-500 mt-1'>
                Mention `@aglintai` in a comment, then include the task details.
                Aglint AI will handle the rest.
              </p>
            </div>
          </div>
          <Alert>
            <AlertTitle className='flex items-center'>
              <Lightbulb className='h-4 w-4 text-purple-500 mr-2' />
              How to Use:
            </AlertTitle>
            <AlertDescription>
              <ol className='list-decimal list-inside space-y-2 text-sm mt-2'>
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

async function getGreenhouseSync(
  syncData: GreenHouseFullSyncAPI['request']['syncData'],
) {
  const res = await axios.call<GreenHouseFullSyncAPI>(
    'POST',
    '/api/sync/greenhouse/full_sync',
    {
      syncData,
    },
  );
  return res;
}
