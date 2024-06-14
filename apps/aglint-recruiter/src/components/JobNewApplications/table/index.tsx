/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { memo } from 'react';

import { ApplicantsListEmpty } from '@/devlink2/ApplicantsListEmpty';
import { ApplicantsTable } from '@/devlink2/ApplicantsTable';
import { SkeletonCandidateListItem } from '@/devlink2/SkeletonCandidateListItem';
import NoApplicants from '@/public/lottie/NoApplicants';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';

import { Loader } from '../ui/candidateDrawer/common';
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
  if ((count[section] ?? 0) === 0) return <EmptyList />;
  if (sectionApplication.status === 'error') return <>Error</>;
  if (sectionApplication.status === 'pending') return <>Loading...</>;
  return (
    <ApplicantsList
      key={section}
      applications={sectionApplication}
      count={count[section]}
      loader={
        <Loader count={5}>
          <SkeletonCandidateListItem
            isScreeningVisible={cascadeVisibilites.screening}
            isAssessmentVisible={cascadeVisibilites.assessment}
            isInterviewVisible={cascadeVisibilites.interview}
            isDisqualifiedVisible={cascadeVisibilites.disqualified}
          />
        </Loader>
      }
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

const EmptyList = memo(() => {
  const section = useApplicationsStore(({ section }) => section);
  return (
    <Stack height={'50vh'} justifyContent={'center'}>
      <Stack>
        <ApplicantsListEmpty
          textEmpty={section}
          slotLottie={<NoApplicants />}
        />
      </Stack>
    </Stack>
  );
});
EmptyList.displayName = 'EmptyList';
