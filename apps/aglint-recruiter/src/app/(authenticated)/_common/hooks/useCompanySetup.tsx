import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAllInterviewModules, useIntegrations } from '@/authenticated/hooks';
import {
  useTenant,
  useTenantMembers,
  useTenantOfficeLocations,
} from '@/company/hooks';
import { useFlags } from '@/company/hooks/useFlags';
import { useJobs } from '@/jobs/hooks';
import { api } from '@/trpc/client';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeAll } from '@/utils/text/textUtils';

import { setIsOnboardOpen } from '../store/OnboardStore';
import { useAllDepartments } from './useAllDepartments';

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
  const [selectedStep, setSelectedStep] = useState<SetupStepType>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [isOnboardCompleteRemote, setIsOnboardCompleteRemote] = useState(true);
  const [firstTimeOpened, setFirstTimeOpened] = useState(false);

  const { mutateAsync, isPending } =
    api.tenant.updateTenantPreference.useMutation();
  //Hooks ---
  const { recruiter } = useTenant();
  const { data: departments } = useAllDepartments();
  const { data: locations } = useTenantOfficeLocations();
  const { data: interviewPools } = useAllInterviewModules();
  const {
    jobs: { data: jobs },
  } = useJobs();

  const { data: integrations, isLoading: integrationLoading } =
    useIntegrations();
  const {
    allMembers,
    isLoading: memberLoading,
    isFetched: isMembersFetched,
  } = useTenantMembers();
  const {
    data: candidateInterviewPlan,
    isLoading: companySettingLoading,
    refetch: onboardCandPlanRefetch,
  } = useFetchOnboardCandPlan();

  const { isShowFeature } = useFlags();

  useEffect(() => {
    if (recruiter.recruiter_preferences) {
      setIsOnboardCompleteRemote(
        recruiter.recruiter_preferences.onboard_complete,
      );
    }
  }, [recruiter]);

  useEffect(() => {
    const firstIncompleteStep = steps.find((step) => !step.isLocalCompleted);
    const firstIncompleteStepIndex = steps.findIndex(
      (step) => !step.isLocalCompleted,
    );
    setSelectedStep(
      firstIncompleteStep
        ? firstIncompleteStep
        : selectedIndex
          ? steps[selectedIndex]
          : undefined,
    );

    if (firstIncompleteStepIndex) {
      setSelectedIndex(
        firstIncompleteStepIndex ? firstIncompleteStepIndex : selectedIndex,
      );
    }
    if (
      isCompanySetupLocalPending &&
      !isOnboardCompleteRemote &&
      !firstTimeOpened
    ) {
      // setIsOnboardOpen(true);
      setFirstTimeOpened(true);
    }
  }, [steps]);

  //loading ---
  const isLoading =
    memberLoading || integrationLoading || companySettingLoading;

  //checking --- jobs
  const isIntegrationsPresent =
    !!integrations?.ashby_key ||
    !!integrations?.lever_key ||
    !!integrations?.greenhouse_key;

  const isCompanyDetailsCompleted =
    !!recruiter?.name &&
    !!recruiter?.logo &&
    !!recruiter?.employee_size &&
    !!recruiter?.industry;

  const requiredProperties = ['name', 'logo', 'employee_size', 'industry'];
  const missingCompanyProperties = recruiter
    ? findMissingProperties(recruiter, requiredProperties)
    : [];

  const isLocationsPresent = !!locations.length;
  const isDepartmentsPresent = !!departments.length;
  const isMembersPresent = allMembers?.length > 1 ? true : false;

  // checking --- request

  const isCandidatePresent = candidateInterviewPlan?.candidateCount
    ? candidateInterviewPlan.candidateCount > 0
    : false;
  const isInterviewPlanPresent = candidateInterviewPlan?.interviewPlanCount
    ? candidateInterviewPlan.interviewPlanCount > 0
    : false;
  const isInterviewPoolPresent = !!interviewPools?.length;
  const isJobsPresent = !!jobs?.length;

  //steps ------

  const requestSetupSteps = steps.filter((step) =>
    requestIds.includes(step.id),
  );

  const jobSetupSteps = steps.filter((step) => jobIds.includes(step.id));

  // total pending ------
  const isCompanySetupLocalPending =
    steps.filter((step) => (step?.isOptional ? false : !step.isLocalCompleted))
      .length > 0
      ? true
      : false;

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
    } else
      setSteps((pre) =>
        pre.map((step) =>
          step.id === id ? { ...step, isLocalCompleted: true } : step,
        ),
      );
  }

  async function finishHandler() {
    setIsOnboardOpen(false);
  }

  // refetch function
  const onboardRefetch = (type: 'candidate' | 'interviewPlan') => {
    if (type === 'candidate' && !isCandidatePresent) {
      onboardCandPlanRefetch();
    }
    if (type === 'interviewPlan' && !isInterviewPlanPresent) {
      onboardCandPlanRefetch();
    }
  };
  useEffect(() => {
    if (
      recruiter &&
      integrations &&
      allMembers &&
      candidateInterviewPlan &&
      locations &&
      departments
    ) {
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
          isCompleted: isMembersPresent,
          isLocalCompleted: isMembersPresent,
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
          isCompleted: isInterviewPoolPresent,
          isLocalCompleted: isInterviewPoolPresent,
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
          isCompleted: isCandidatePresent,
          isLocalCompleted: isCandidatePresent,
          navLink: isJobsPresent
            ? ROUTES['/jobs/[job]']({
                job: jobs?.[0].id ?? '',
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
          isCompleted: isInterviewPlanPresent,
          isLocalCompleted: isInterviewPlanPresent,
          navLink: isJobsPresent
            ? ROUTES['/jobs/[job]/interview-plan']({
                job: jobs?.[0].id ?? '',
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
      setSteps(newSteps);
    }
  }, [
    recruiter,
    integrations,
    isMembersFetched,
    jobs,
    allMembers,
    locations,
    interviewPools,
    departments,
    candidateInterviewPlan,
  ]);

  return {
    isLoading,
    isPending,
    companySetupProgress,
    requestSetupProgress,
    jobSetupProgress,
    onboardRefetch,
    companySetupSteps: steps,
    requestSetupSteps,
    jobSetupSteps,
    isCompanySetupLocalPending,
    isCompanySetupPending,
    isRequestSetupPending,
    isJobSetupPending,
    currentStepMarkAsComplete,
    finishHandler,
    selectedIndex,
    setSelectedIndex,
    selectedStep,
    setSelectedStep,
    isOnboardCompleteRemote,
  };
}

export const useFetchOnboardCandPlan = () => {
  const { recruiter_id } = useTenant();

  const query = useQuery({
    queryKey: ['company_setup', recruiter_id],
    queryFn: () => fetchCompanySetup(recruiter_id),
    enabled: !!recruiter_id,
  });

  return { ...query };
};

export const fetchCompanySetup = async (recruiter_id: string) => {
  const { data } = await supabase
    .from('recruiter')
    .select('interview_plan(count),candidates(count)')
    .eq('id', recruiter_id)
    .single()
    .throwOnError();

  const candPlan = data!;

  return {
    candidateCount: candPlan.candidates[0].count,
    interviewPlanCount: candPlan.interview_plan[0].count,
  };
};

function findMissingProperties(obj: any, requiredProps: string[]) {
  return requiredProps.filter((prop) => obj[prop] === null || obj[prop] === '');
}
