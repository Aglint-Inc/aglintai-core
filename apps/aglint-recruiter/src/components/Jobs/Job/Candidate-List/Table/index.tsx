/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { ApplicantsTable } from '@/devlink2/ApplicantsTable';
import { SkeletonCandidateListItem } from '@/devlink2/SkeletonCandidateListItem';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import { Loader } from '../Common/candidateDrawer/common';
import { EmptyList } from './common';
import ApplicantsList from './list';

export const Table = memo(() => {
  return (
    <>
      <List />
    </>
  );
});
Table.displayName = 'Table';

const List = memo(() => {
  const {
    job: { count },
    cascadeVisibilites,
    section,
    sectionApplication,
  } = useApplications();

  const {
    drawer: { application_id },
    handleOpen,
  } = useApplicationStore(({ drawer, handleOpen }) => ({
    drawer,
    handleOpen,
  }));

  const sectionApplications = useMemo(
    () => (sectionApplication?.data?.pages ?? []).flatMap((page) => page),
    [sectionApplication?.data?.pages],
  );

  const currentIndex = useMemo(
    () => sectionApplications.findIndex(({ id }) => id === application_id),
    [application_id, sectionApplications],
  );

  const applicationsCount = useMemo(
    () => sectionApplications.length,
    [sectionApplications],
  );

  const handleSelectNextApplication = useCallback(() => {
    handleOpen({
      application_id:
        sectionApplications[(currentIndex + 1) % applicationsCount].id,
    });
  }, [sectionApplication, currentIndex, applicationsCount, handleOpen]);

  const handleSelectPrevApplication = useCallback(() => {
    handleOpen({
      application_id:
        sectionApplications[
          currentIndex - 1 < 0 ? applicationsCount - 1 : currentIndex - 1
        ].id,
    });
  }, [sectionApplication, currentIndex, applicationsCount, handleOpen]);

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

  if ((count[section] ?? 0) === 0) return <EmptyList />;
  if (sectionApplication.status === 'error') return <>Error</>;
  if (sectionApplication.status === 'pending')
    return <Loader count={8}>{skeleton}</Loader>;

  return (
    <ApplicantsList
      key={section}
      applications={sectionApplication}
      count={count[section]}
      loader={<Loader count={5}>{skeleton}</Loader>}
      header={
        <Stack
          style={{ zIndex: count[section] + 1, position: 'sticky', top: 0 }}
        >
          <ApplicantsTable
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
List.displayName = 'List';
