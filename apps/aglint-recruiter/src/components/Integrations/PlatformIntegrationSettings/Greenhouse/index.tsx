/* eslint-disable security/detect-object-injection */
import dayjs from 'dayjs';
import React from 'react';

import GreenhouseIcon from '@/components/icons/GreenhouseIcon.svg';
import GreenInCircle from '@/components/icons/GreenInCircle.svg';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
// import relativeTime from 'dayjs/plugin/relativeTime';
import { AtsSettings } from '@/devlink/AtsSettings';
import { type GreenHouseFullSyncAPI } from '@/src/app/api/sync/greenhouse/full_sync/type';
import axios from '@/src/client/axios';
import AutoCompletePro from '@/src/components/Common/AutoCompletePro';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useGreenhouseDetails } from '@/src/queries/greenhouse';

function GreenhouseSettings() {
  const { data, isPending, setOptions, refetch } = useGreenhouseDetails();
  const timeStamp = data && data.last_sync['full_sync'];
  const last_sync = timeStamp ? dayjs(timeStamp).fromNow() : 'Never';
  return (
    <div className='flex flex-col'>
      {isPending ? (
        <DynamicLoader />
      ) : (
        <AtsSettings
          slotButton={<>actions</>}
          slotAtsIcon={<GreenhouseIcon />}
          textAtsConnected={'Greenhouse is connected'}
          textSyncItems={'Sync items'}
          slotConnectIcon={<GreenInCircle />}
          slotSyncItems={
            <>
              <div className='flex flex-col gap-1'>
                {Object.entries(GreenhouseSync.options).map(
                  ([key, subOptions]) => (
                    <div key={key} className='flex items-center space-x-2'>
                      <Checkbox
                        id={subOptions?.name}
                        checked={data.options[key]}
                        onCheckedChange={() => {
                          data.options[String(key)] =
                            !data.options?.[String(key)];
                          setOptions(data);
                        }}
                      />
                      <label
                        htmlFor={subOptions?.name}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {subOptions?.name}
                      </label>
                    </div>
                  ),
                )}
              </div>
              <div className='h-px w-full bg-neutral-200 my-3'></div>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center'>
                  <p className='text-sm'>{`Last Sync: ${last_sync}`}</p>
                </div>
                <Button
                  onClick={() => getGreenhouseSync(data).then(() => refetch())}
                >
                  Sync
                </Button>
              </div>
            </>
          }
          slotFrequencySync={
            <AutoCompletePro
              value={'24 hours'}
              onChange={() => {}}
              options={[
                '6 Hours',
                '12 Hours',
                '24 Hours',
                '3 Days',
                '7 Days',
                '15 Days',
                '30 Days',
                'Never',
              ]}
            />
          }
          slotAiInstructionsTextArea={<Input />}
          slotCheckbox={
            <Checkbox
              checked={data.options['task_sync']}
              onClick={() => {
                data.options['task_sync'] = !data.options?.['task_sync'];
                setOptions(data);
              }}
            />
          }
        />
      )}
    </div>
  );
}

export default GreenhouseSettings;

type GreenhouseSyncOptions = {
  description: string;
  options: {
    [options: string]: {
      name: string;
      onCheck?: () => Promise<unknown>;
      subOption: {
        description: string;
        options: {
          [options: string]: string;
        };
      };
    };
  };
};

const GreenhouseSync: GreenhouseSyncOptions = {
  description: 'Sync Greenhouse Job Plans',
  options: {
    jobs: {
      name: 'Jobs',
      subOption: undefined,
      // subOption: {
      //   description: 'Sync Greenhouse Interview Stages',
      //   options: {
      //     job_status: {
      //       name: 'Active jobs',
      //       isEnabled: true,
      //     },
      //     job_hiring_team: {
      //       name: 'Hiring team',
      //       isEnabled: true,
      //     },
      //     job_interview_plan: { name: 'Interview plan', isEnabled: true },
      //   },
      // },
    },
    interview_stages: {
      name: 'Interview Plan',
      subOption: undefined,
    },
    candidates: {
      name: 'Candidates',
      subOption: undefined,
    },
    applications: {
      name: 'Applications',
      subOption: undefined,
    },
    departments: {
      name: 'Departments',
      subOption: undefined,
    },
    office_locations: {
      name: 'Office Locations',
      subOption: undefined,
    },
    users: {
      name: 'Users',
      subOption: undefined,
    },
  },
} as const;

// async function syncGreenhouseDepartments() {
//   return await axios.call<GreenhouseDepartmentsAPI>(
//     'GET',
//     '/api/integrations/greenhouse/sync/departments',
//     null,
//   );
// }

// async function setGreenhouseOfficeLocations() {
//   const res = await axios.call<GreenhouseOfficeLocationsAPI>(
//     'GET',
//     '/api/integrations/greenhouse/sync/office_locations',
//     {},
//   );
//   return res;
// }

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
