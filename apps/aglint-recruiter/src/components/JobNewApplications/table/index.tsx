import { DatabaseEnums } from '@aglint/shared-types';
import { Stack } from '@mui/material';

import { ApplicantsListEmpty } from '@/devlink2/ApplicantsListEmpty';
import NoApplicants from '@/public/lottie/NoApplicants';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';

import ApplicantsList from './list';

const List = () => {
  const section = useJobDashboardStore(({ section }) => section);
  const applications = useSectionApplication(section);
  if (
    applications.status === 'success' &&
    applications.data.pages.flatMap((page) => page).length === 0
  )
    return <EmptyList />;
  return <ApplicantsList key={section} applications={applications} />;
};

const EmptyList = () => {
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
};

export default List;

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
