/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { memo, useEffect, useMemo } from 'react';

import { ApplicantsTable } from '@/devlink2/ApplicantsTable';
import { SkeletonCandidateListItem } from '@/devlink2/SkeletonCandidateListItem';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import { Loader } from '../../Common/CandidateDrawer/Common/Loader';
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
      <SkeletonCandidateListItem
        isScreeningVisible={cascadeVisibilites.screening}
        isAssessmentVisible={cascadeVisibilites.assessment}
        isInterviewVisible={cascadeVisibilites.interview}
        isDisqualifiedVisible={cascadeVisibilites.disqualified}
      />
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
            isScreeningVisible={cascadeVisibilites.screening}
            isAssessmentVisible={cascadeVisibilites.assessment}
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
