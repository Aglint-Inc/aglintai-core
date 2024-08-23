/* eslint-disable security/detect-object-injection */
import { Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

import { AtsSettings } from '@/devlink/AtsSettings';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GreenHouseFullSyncAPI } from '@/src/app/api/sync/greenhouse/full_sync/type';
import axios from '@/src/client/axios';
import AutoCompletePro from '@/src/components/Common/AutoCompletePro';
import { CheckBoxWithText } from '@/src/components/Common/CheckBoxWithText';
import UITextField from '@/src/components/Common/UITextField';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useGreenhouseDetails } from '@/src/queries/greenhouse';

function GreenhouseSettings() {
  const { data, isPending, setOptions, refetch } = useGreenhouseDetails();
  const timeStamp = data && data.last_sync['full_sync'];
  const last_sync = timeStamp ? dayjs(timeStamp).fromNow() : 'Never';
  return (
    <Stack p={2}>
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
              <Stack gap={1}>
                {Object.entries(GreenhouseSync.options).map(
                  ([key, subOptions]) => (
                    <CheckBoxWithText
                      key={key}
                      checked={data.options[key]}
                      text={subOptions.name}
                      onClick={async () => {
                        data.options[key] = !data.options?.[key];
                        setOptions(data);
                        // setSyncData((pre) => ({
                        //   ...pre,
                        //   options: {
                        //     ...syncData.options,
                        //     [key]: !syncData.options[key],
                        //   },
                        // }));
                      }}
                    />
                    //  {subOptions.description && (
                    //   <Typography pl={3} variant='subtitle2' color={'GrayText'}>
                    //     {subOptions.description}
                    //   </Typography>
                    // )}
                  ),
                )}
              </Stack>
              <Divider sx={{ borderColor: 'var(--neutral-6)' }} />
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography variant='subtitle2'>{`Last Sync: ${last_sync}`}</Typography>
                </Stack>
                <ButtonSoft
                  size={1}
                  textButton='Sync'
                  onClickButton={{
                    onClick: () =>
                      getGreenhouseSync(data).then(() => refetch()),
                  }}
                />
              </Stack>
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
          slotAiInstructionsTextArea={
            <UITextField
              multiline
              minRows={2}
              maxRows={5}
              defaultValue='Enter your Instructions'
            />
          }
        />
      )}
    </Stack>
  );
}

export default GreenhouseSettings;

function GreenhouseIcon() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='20' height='20' rx='2.66667' fill='#24A57F' />
      <g clip-path='url(#clip0_5461_119383)'>
        <path
          d='M11.9921 7.63698C11.9921 8.1734 11.7639 8.64793 11.3903 9.0193C10.9753 9.43193 10.3735 9.53508 10.3735 9.88582C10.3735 10.3603 11.1413 10.2159 11.878 10.9483C12.3657 11.4332 12.6666 12.0728 12.6666 12.8155C12.6666 14.2803 11.4837 15.446 9.99992 15.446C8.51613 15.446 7.33325 14.2803 7.33325 12.8165C7.33325 12.0728 7.63416 11.4332 8.12184 10.9483C8.85854 10.2159 9.62638 10.3603 9.62638 9.88582C9.62638 9.53508 9.02456 9.43193 8.60952 9.0193C8.23598 8.64793 8.0077 8.1734 8.0077 7.61635C8.0077 6.54351 8.88967 5.67699 9.96879 5.67699C10.1763 5.67699 10.3631 5.70793 10.5187 5.70793C10.7989 5.70793 10.9441 5.58415 10.9441 5.38815C10.9441 5.27467 10.8923 5.13025 10.8923 4.97552C10.8923 4.62478 11.1932 4.33594 11.5563 4.33594C11.9195 4.33594 12.21 4.63509 12.21 4.99615C12.21 5.37783 11.9091 5.5532 11.6809 5.63572C11.4941 5.69762 11.3488 5.78014 11.3488 5.96583C11.3488 6.31656 11.9921 6.65698 11.9921 7.63698ZM11.7846 12.8165C11.7846 11.7953 11.0272 10.97 9.99992 10.97C8.97268 10.97 8.21522 11.7953 8.21522 12.8165C8.21522 13.8275 8.97268 14.6631 9.99992 14.6631C11.0272 14.6631 11.7846 13.8264 11.7846 12.8165ZM11.1724 7.61635C11.1724 6.96646 10.6432 6.43004 9.99992 6.43004C9.3566 6.43004 8.82742 6.96646 8.82742 7.61635C8.82742 8.26624 9.3566 8.80266 9.99992 8.80266C10.6432 8.80266 11.1724 8.26624 11.1724 7.61635Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_5461_119383'>
          <rect
            width='5.33333'
            height='11.1111'
            fill='white'
            transform='translate(7.33337 4.33203)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function GreenInCircle() {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 12C4.90625 11.9844 3.90625 11.7188 3 11.2031C2.09375 10.6719 1.35938 9.9375 0.796875 9C0.265625 8.04688 0 7.04688 0 6C0 4.95312 0.265625 3.95313 0.796875 3C1.35938 2.0625 2.09375 1.32813 3 0.796875C3.90625 0.28125 4.90625 0.015625 6 0C7.09375 0.015625 8.09375 0.28125 9 0.796875C9.90625 1.32813 10.6406 2.0625 11.2031 3C11.7344 3.95313 12 4.95312 12 6C12 7.04688 11.7344 8.04688 11.2031 9C10.6406 9.9375 9.90625 10.6719 9 11.2031C8.09375 11.7188 7.09375 11.9844 6 12ZM8.64844 4.89844C8.86719 4.63281 8.86719 4.36719 8.64844 4.10156C8.38281 3.88281 8.11719 3.88281 7.85156 4.10156L5.25 6.70312L4.14844 5.60156C3.88281 5.38281 3.61719 5.38281 3.35156 5.60156C3.13281 5.86719 3.13281 6.13281 3.35156 6.39844L4.85156 7.89844C5.11719 8.11719 5.38281 8.11719 5.64844 7.89844L8.64844 4.89844Z'
        fill='#228F67'
      />
    </svg>
  );
}

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
