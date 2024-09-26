import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAllIntegrations } from '@/authenticated/hooks';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useAllMembers } from '@/queries/members';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
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
    | 'interview-plan'
    | string;
  title: string;
  description: string;
  isCompleted: boolean;
  navLink: string;
  isOptional: boolean;
  isVisiable: boolean;
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
  //Hooks ---
  const { recruiter, loading: recruiterLoading } = useAuthDetails();
  const { data: integrations, isLoading: integrationLoading } =
    useAllIntegrations();
  const { allMembers, isLoading: memberLoading } = useAllMembers();
  const { data: compandDetails, isLoading: companySettingLoading } =
    useFetchcompanySetup();

  const { isShowFeature } = useAuthDetails();

  //loading ---
  const isLoading =
    recruiterLoading ||
    memberLoading ||
    integrationLoading ||
    companySettingLoading;

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

  const isLocationsPresent = !!recruiter?.office_locations.length;
  const isDepartmentsPresent = !!recruiter?.departments.length;

  const isMembersPresent = allMembers?.length > 1 ? true : false;

  // checking --- request

  const isCandidatePresent = !!compandDetails?.candidates.length;
  const isInterviewPoolPresent = !!compandDetails?.interview_module.length;
  const isInterviewPlanPresent = !!compandDetails?.interview_plan.length;
  const isJobsPresent = !!compandDetails?.public_jobs.length;

  //steps ------

  const companySetupSteps = steps;

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
    (steps?.filter((step) => step.isCompleted).length / steps.length) * 100;

  const requestSetupProgress =
    (requestSetupSteps?.filter((step) => step.isCompleted).length /
      requestSetupSteps.length) *
    100;

  const jobSetupProgress =
    (jobSetupSteps?.filter((step) => step.isCompleted).length /
      jobSetupSteps.length) *
    100;

  useEffect(() => {
    if (recruiter && integrations && allMembers && compandDetails) {
      const newSteps = [
        {
          id: 'company-details',
          title: 'Company Details',
          description: `Update basic information like company ${missingCompanyProperties?.map((pro) => capitalizeAll(pro)).join(', ')} details.`,
          isCompleted: isCompanyDetailsCompleted,
          navLink: ROUTES['/company']() + '?tab=company-info',
          isOptional: false,
          isVisiable: true,
        },
        {
          id: 'departments-locations',
          title: 'Departments and Locations',
          description: "Add your company's departments and office locations.",
          isCompleted: isLocationsPresent && isDepartmentsPresent,
          navLink: ROUTES['/company']() + '?tab=company-info',
          isOptional: false,
          isVisiable: true,
        },
        {
          id: 'add-users',
          title: 'Add Users (Optional)',
          description: 'Invite team members to join and collaborate.',
          isCompleted: isMembersPresent,
          navLink: ROUTES['/company']() + '?tab=team',
          isOptional: true,
          isVisiable: true,
        },
        {
          id: 'integrations',
          title: 'Integrations (Optional)',
          description:
            'Connect your ATS or Google Workspace for seamless integration.',
          isCompleted: isIntegrationsPresent,
          navLink: ROUTES['/integrations'](),
          isOptional: true,
          isVisiable: isShowFeature('INTEGRATIONS'),
        },
        {
          id: 'interview-pool',
          title: 'Set Interview Pool',
          description: 'Add at least one interviewer',
          isCompleted: isInterviewPoolPresent,
          navLink: ROUTES['/interview-pool'](),
          isOptional: false,
          isVisiable: true,
        },

        {
          id: 'create-job',
          title: 'Create Job',
          description: 'At least one job must be present',
          isCompleted: isJobsPresent,
          navLink: ROUTES['/jobs/create'](),
          isOptional: false,
          isVisiable: true,
        },
        {
          id: 'candidate',
          title: 'Add Candidate',
          description: 'Add at least one candidate/application',
          isCompleted: isCandidatePresent,
          navLink: ROUTES['/jobs'](),
          isOptional: false,
          isVisiable: true,
        },
        {
          id: 'interview-plan',
          title: 'Set Interview Plan',
          description: 'Create an interview plan for the job',
          isCompleted: isInterviewPlanPresent,
          navLink: ROUTES['/jobs'](),
          isOptional: false,
          isVisiable: true,
        },
      ]
        .filter((step) => step.isVisiable)
        .sort((a, b) => Number(b?.isCompleted) - Number(a?.isCompleted));
      setSteps(newSteps);
    }
  }, [recruiter, integrations, allMembers]);

  return {
    isLoading,
    companySetupProgress,
    requestSetupProgress,
    jobSetupProgress,
    companySetupSteps,
    requestSetupSteps,
    jobSetupSteps,
    isCompanySetupPending,
    isRequestSetupPending,
    isJobSetupPending,
  };
}

const useFetchcompanySetup = () => {
  const { recruiter_id } = useAuthDetails();
  return useQuery({
    queryKey: ['company_setup'],
    queryFn: () => fetchCompanySetup(recruiter_id ? recruiter_id : ''),
    enabled: !!recruiter_id,
  });
};

const fetchCompanySetup = async (recruiter_id: string) => {
  return (
    await supabase
      .from('recruiter')
      .select(
        'public_jobs(*),interview_plan(*),candidates(*),interview_module(*)',
      )
      .eq('id', recruiter_id)
      .single()
      .throwOnError()
  ).data;
};

function findMissingProperties(obj: any, requiredProps: string[]) {
  return requiredProps.filter((prop) => obj[prop] === null || obj[prop] === '');
}
