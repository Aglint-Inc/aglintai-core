'use client ';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { useFlags } from '@/company/hooks/useFlags';
import { api } from '@/trpc/client';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

export type SetupStepType = {
  id:
    | 'company-details'
    | 'departments-locations'
    | 'add-users'
    | 'integrations'
    | 'interview-pool'
    | 'create-job'
    | 'candidate'
    | 'interview-plan';
  title: string;
  description: string;
  isCompleted: boolean;
  isLocalCompleted: boolean;
  navLink: string;
  isNavDisable: boolean;
  toolTipText: string;
  isOptional: boolean;
  isVisible: boolean;
  bulletPoints?: string[];
  scoringPoints?: string[];
  schedulingPoints?: string[];
};

const jobIds: SetupStepType['id'][] = [
  'company-details',
  'departments-locations',
  'add-users',
  'integrations',
];
const requestIds: SetupStepType['id'][] = [
  'interview-pool',
  'create-job',
  'candidate',
  'interview-plan',
];

export function useCompanySetup() {
  //states ---
  const [steps, setSteps] = useState<SetupStepType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [firstTimeOpened, setFirstTimeOpened] = useState(false);
  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  //-------------------- hook
  const { data, isLoading } = api.onboarding.getOnboard.useQuery();
  const { mutateAsync, isPending } =
    api.tenant.updateTenantPreference.useMutation();
  const { recruiter } = useTenant();
  const { isShowFeature } = useFlags();

  // ----------------- drived state

  const {
    firstJobId = null,
    isDepartmentsPresent = true,
    isIntegrationsPresent = true,
    isInterviewPoolsPresent = true,
    isLocationsPresent = false,
    isOnboardCompleteRemote = true,
    isUsersPresent = false,
    isJobsPresent = false,
    isCandidatesPresent = false,
    isInterviewPlansPresent = false,
  } = data! || {};

  const isCompanySetupLocalPending =
    steps.filter((step) => (step?.isOptional ? false : !step.isLocalCompleted))
      .length > 0
      ? true
      : false;

  //checking --- jobs

  const isCompanyDetailsCompleted =
    !!recruiter?.name &&
    !!recruiter?.logo &&
    !!recruiter?.employee_size &&
    !!recruiter?.industry;

  const requiredProperties = ['name', 'logo', 'employee_size', 'industry'];
  const missingCompanyProperties = recruiter
    ? findMissingProperties(recruiter, requiredProperties)
    : [];

  const requestSetupSteps = steps.filter((step) =>
    requestIds.includes(step.id),
  );

  const jobSetupSteps = steps.filter((step) => jobIds.includes(step.id));

  // total pending ------

  const isCompanySetupPending =
    steps.filter((step) => (step?.isOptional ? false : !step.isCompleted))
      .length > 0
      ? true
      : false;

  const isRequestSetupPending =
    requestSetupSteps.filter((step) =>
      step?.isOptional ? false : !step.isCompleted,
    ).length > 0
      ? true
      : false;

  const isJobSetupPending =
    jobSetupSteps.filter((step) =>
      step?.isOptional ? false : !step.isCompleted,
    ).length > 0
      ? true
      : false;

  // progress ----------------

  const companySetupProgress =
    (steps?.filter((step) => step.isLocalCompleted).length / steps.length) *
    100;

  const requestSetupProgress =
    (requestSetupSteps?.filter((step) => step.isCompleted).length /
      requestSetupSteps.length) *
    100;

  const jobSetupProgress =
    (jobSetupSteps?.filter((step) => step.isCompleted).length /
      jobSetupSteps.length) *
    100;

  //complelet functions ------------------------
  async function currentStepMarkAsComplete(id: string) {
    if (steps.filter((step) => !step.isLocalCompleted).length === 1) {
      await mutateAsync({ onboard_complete: true });
      setSteps((pre) =>
        pre.map((step) =>
          step.id === id ? { ...step, isLocalCompleted: true } : step,
        ),
      );
    } else {
      const newSteps = steps.map((step) =>
        step.id === id ? { ...step, isLocalCompleted: true } : step,
      );

      const firstIncompleteIndex = newSteps.findIndex(
        (step) => !step.isLocalCompleted,
      );

      setSteps(newSteps);
      setSelectedIndex(firstIncompleteIndex ? firstIncompleteIndex : 0);
    }
  }

  async function finishHandler() {
    setIsOnboardOpen(false);
  }

  useEffect(() => {
    if (recruiter && data) {
      const newSteps = [
        {
          id: 'company-details',
          title: 'Company Details',
          description: `Update basic information details.`,

          isCompleted: isCompanyDetailsCompleted,
          isLocalCompleted: isCompanyDetailsCompleted,
          navLink: ROUTES['/company']() + '?tab=company-info&edit=true',
          isOptional: false,
          isVisible: true,
          isNavDisable: false,
          bulletPoints: missingCompanyProperties?.map((pro) =>
            capitalizeAll(pro),
          ),
        },
        {
          id: 'departments-locations',
          title: 'Departments and Locations',
          description: "Add your company's departments and office locations. ",
          isCompleted: isLocationsPresent && isDepartmentsPresent,
          isLocalCompleted: isLocationsPresent && isDepartmentsPresent,
          navLink: ROUTES['/company']() + '?tab=company-info&indicator=true',
          isOptional: false,
          isVisible: true,
          isNavDisable: false,
          bulletPoints: ['List of departments', 'Office locations'],
        },
        {
          id: 'add-users',
          title: 'Add Users (Optional)',
          description: 'Invite team members to join and collaborate.',
          isCompleted: isUsersPresent,
          isLocalCompleted: isUsersPresent,
          navLink: ROUTES['/company']() + '?tab=team&add_user=true',
          isOptional: true,
          isVisible: true,
          isNavDisable: false,
          bulletPoints: ['User email', 'User role'],
        },
        {
          id: 'integrations',
          title: 'Integrations (Optional)',
          description:
            'Connect your ATS or Google Workspace for seamless integration.',
          isCompleted: isIntegrationsPresent,
          isLocalCompleted: isIntegrationsPresent,
          navLink: ROUTES['/integrations'](),
          isOptional: true,
          isNavDisable: false,
          isVisible: isShowFeature('INTEGRATIONS'),
        },
        {
          id: 'interview-pool',
          title: 'Set Interview Pool',
          description: 'Add at least one interviewer',
          isCompleted: isInterviewPoolsPresent,
          isLocalCompleted: isInterviewPoolsPresent,
          navLink: ROUTES['/interview-pool']() + '?add_pool=true',
          isOptional: false,
          isVisible: true,
          isNavDisable: false,
          bulletPoints: [
            'Interview pool name',
            'Description',
            'Interview type (virtual, onsite)',
          ],
          schedulingPoints: [
            'Enables efficient interview scheduling',
            'Helps categorize interview types',
          ],
        },

        {
          id: 'create-job',
          title: 'Create Job',
          description: 'At least one job must be present',
          isCompleted: isJobsPresent,
          isLocalCompleted: isJobsPresent,
          navLink: ROUTES['/jobs/create'](),
          isOptional: false,
          isVisible: true,
          isNavDisable: false,
          bulletPoints: ['Job title', 'Description', 'Interview type'],
          scoringPoints: [
            'Enables efficient candidate scoring',
            'Facilitates shortlisting based on job criteria',
          ],
          schedulingPoints: ['Allows for job-specific interview scheduling'],
        },
        {
          id: 'candidate',
          title: 'Add Candidate',
          description: 'Add at least one candidate/application',
          isCompleted: isCandidatesPresent,
          isLocalCompleted: isCandidatesPresent,
          navLink: isJobsPresent
            ? ROUTES['/jobs/[job]']({
                job: firstJobId ?? '',
              }) + '?indicator=true'
            : '',
          isOptional: false,
          isVisible: true,
          isNavDisable: !isJobsPresent,
          toolTipText: 'Please add the job first',
          bulletPoints: ['Candidate name', 'Email', 'Applied job'],
          scoringPoints: [
            'Enables candidate shortlisting based on job criteria',
          ],
          schedulingPoints: ['Facilitates interview scheduling for candidates'],
        },
        {
          id: 'interview-plan',
          title: 'Set Interview Plan',
          description: 'Create an interview plan for the job',
          isCompleted: isInterviewPlansPresent,
          isLocalCompleted: isInterviewPlansPresent,
          navLink: isJobsPresent
            ? ROUTES['/jobs/[job]/interview-plan']({
                job: firstJobId ?? '',
              }) + '?indicator=true'
            : '',
          isNavDisable: !isJobsPresent,
          toolTipText: 'Please add the job first',
          isOptional: false,
          isVisible: true,
          bulletPoints: ['Interview type', 'Assigned interviewers'],
          schedulingPoints: [
            'Enables efficient interview scheduling',
            'Helps organize different interview types',
          ],
        },
      ]
        .filter((step) => step.isVisible)
        .sort(
          (a, b) => Number(b?.isCompleted) - Number(a?.isCompleted),
        ) as SetupStepType[];

      const firstIncompleteIndex = newSteps.findIndex(
        (step) => !step.isLocalCompleted,
      );
      setSelectedIndex(firstIncompleteIndex ? firstIncompleteIndex : 0);

      if (!isOnboardCompleteRemote && !firstTimeOpened) {
        setIsOnboardOpen(true);
        setFirstTimeOpened(true);
      }

      setSteps(newSteps);
    }
  }, [data, isLoading]);

  return {
    isLoading,
    isPending,
    isOnboardOpen,
    setIsOnboardOpen,
    companySetupProgress,
    requestSetupProgress,
    jobSetupProgress,
    companySetupSteps: steps,
    requestSetupSteps,
    jobSetupSteps,
    isCompanySetupLocalPending,
    isCompanySetupPending,
    isRequestSetupPending,
    isJobSetupPending,
    currentStepMarkAsComplete,
    finishHandler,
    selectedStep: steps[selectedIndex],
    selectedIndex,
    setSelectedIndex,
    isOnboardCompleteRemote,
  };
}

function findMissingProperties(obj: any, requiredProps: string[]) {
  return requiredProps.filter((prop) => obj[prop] === null || obj[prop] === '');
}
