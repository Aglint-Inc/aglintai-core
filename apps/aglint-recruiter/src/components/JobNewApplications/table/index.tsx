/* eslint-disable security/detect-object-injection */
import { DatabaseEnums } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { memo } from 'react';

import { ApplicantsListEmpty } from '@/devlink2/ApplicantsListEmpty';
import { ApplicantsTable } from '@/devlink2/ApplicantsTable';
import NoApplicants from '@/public/lottie/NoApplicants';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';

import ApplicantsList from './list';

export const Table = memo(() => {
  const section = useJobDashboardStore(({ section }) => section);
  return (
    <>
      <ApplicantsTable
        isAllChecked={false}
        isScreeningVisible={section === 'screening'}
        isInterviewVisible={section === 'assessment'}
        isDisqualifiedVisible={section === 'disqualified'}
      />
      <List />
    </>
  );
});
Table.displayName = 'Table';

const List = memo(() => {
  const {
    job: { count },
  } = useApplications();
  const section = useJobDashboardStore(({ section }) => section);
  const applications = useSectionApplication(section);
  if ((count[section] ?? 0) === 0) return <EmptyList />;
  if (applications.status === 'error') return <>Error</>;
  if (applications.status === 'pending') return <>Loading...</>;
  return <ApplicantsList key={section} applications={applications} />;
});
List.displayName = 'List';

const EmptyList = memo(() => {
  const section = useJobDashboardStore(({ section }) => section);
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

const useSectionApplication = (
  section: DatabaseEnums['application_status'],
) => {
  const {
    assessmentApplications,
    disqualifiedApplications,
    interviewApplications,
    newApplications,
    qualifiedApplications,
    screeningApplications,
  } = useApplications();

  switch (section) {
    case 'assessment':
      return assessmentApplications;
    case 'new':
      return newApplications;
    case 'qualified':
      return qualifiedApplications;
    case 'disqualified':
      return disqualifiedApplications;
    case 'screening':
      return screeningApplications;
    case 'interview':
      return interviewApplications;
  }
};
