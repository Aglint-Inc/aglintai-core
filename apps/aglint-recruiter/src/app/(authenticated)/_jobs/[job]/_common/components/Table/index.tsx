/* eslint-disable security/detect-object-injection */
import { ApplicantsTable } from '@devlink2/ApplicantsTable';
import { Stack } from '@mui/material';
import { memo, useEffect, useMemo } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useApplications } from '@/job/hooks';

import { Loader } from '../CandidateDrawer/Common/Loader';
import { EmptyList } from './Common/EmptyList';
import List from './List';

export const Table = memo(() => {
  const {
    job: { section_count },
    cascadeVisibilites,
    section,
    sectionApplication,
    handleSelectPrevApplication,
    handleSelectNextApplication,
  } = useApplications();

  const { isScoringEnabled } = useRolesAndPermissions();

  const { pressed: up } = useKeyPress('ArrowUp');
  const { pressed: down } = useKeyPress('ArrowDown');

  useEffect(() => {
    if (up) handleSelectPrevApplication();
    else if (down) handleSelectNextApplication();
  }, [up, down]);

  const skeleton = useMemo(
    () => (
      <div className='flex items-center space-x-4 p-4 pl-[30px]'>
        <div className='w-5 h-5 rounded bg-gray-200 animate-pulse' />
        <div className='space-y-2 flex-1'>
          <div className='h-4 bg-gray-200 rounded animate-pulse' />
        </div>
        {cascadeVisibilites.interview && (
          <div className='h-8 w-20 bg-gray-200 rounded animate-pulse' />
        )}
        {cascadeVisibilites.disqualified && (
          <div className='h-8 w-20 bg-gray-200 rounded animate-pulse' />
        )}
      </div>
    ),
    [cascadeVisibilites],
  );

  if ((section_count[section] ?? 0) === 0) return <EmptyList />;
  if (sectionApplication.status === 'error') return <>Error</>;
  if (sectionApplication.status === 'pending')
    return <Loader count={8}>{skeleton}</Loader>;

  return (
    <List
      key={section}
      applications={sectionApplication}
      count={section_count[section]}
      loader={<Loader count={5}>{skeleton}</Loader>}
      header={
        <Stack
          style={{
            zIndex: section_count[section] + 1,
            position: 'sticky',
            top: 0,
          }}
        >
          <ApplicantsTable
            isResumeMatchVisible={isScoringEnabled}
            isAllChecked={false}
            isScreeningVisible={false}
            isAssessmentVisible={false}
            isInterviewVisible={cascadeVisibilites.interview}
            isDisqualifiedVisible={cascadeVisibilites.disqualified}
            isDragVisible={false}
            propsDrag={null}
            onClickSelectAll={{ style: { display: 'none' } }}
          />
        </Stack>
      }
    />
  );
});
Table.displayName = 'Table';
