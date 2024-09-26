import { useEffect, useState } from 'react';

import { useAllIntegrations } from '@/authenticated/hooks';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useAllMembers } from '@/queries/members';

export interface SetupStep {
  title: string;
  description: string;
  completed: boolean;
  navLink: string;
}

export function useCompanySetup() {
  //states ---
  const [steps, setSteps] = useState<SetupStep[]>([]);
  const [progress, setProgress] = useState<number>(0);

  //Hooks ---
  const { recruiter, loading: recruiterLoading } = useAuthDetails();
  const { data: integrations, isLoading: integrationLoading } =
    useAllIntegrations();
  const { allMembers, isLoading: memberLoading } = useAllMembers();

  //loading ---
  const isLoading = recruiterLoading || memberLoading || integrationLoading;

  //checking ---
  const isIntegrationsPresent =
    !!integrations?.ashby_key ||
    !!integrations?.lever_key ||
    !!integrations?.greenhouse_key;

  const isCompanyDetailsCompleted =
    !!recruiter?.name &&
    !!recruiter?.logo &&
    !!recruiter?.employee_size &&
    !!recruiter?.industry;

  const isLocationsPresent =
    recruiter?.office_locations.length > 0 ? true : false;
  const isDepartmentsPresent = recruiter?.departments.length > 0 ? true : false;

  const isMembersPresent = allMembers?.length > 1 ? true : false;

  const isCompanyDetailsPending = !(
    isIntegrationsPresent &&
    isCompanyDetailsCompleted &&
    isLocationsPresent &&
    isDepartmentsPresent &&
    isMembersPresent
  );

  useEffect(() => {
    if (recruiter && integrations && allMembers) {
      const newSteps = [
        {
          title: 'Company Details',
          description:
            'Update basic information like company name, logo, and contact details.',
          completed: isCompanyDetailsCompleted,
          navLink: '/company?tab=company-info',
        },
        {
          title: 'Departments and Locations',
          description: "Add your company's departments and office locations.",
          completed: isLocationsPresent && isDepartmentsPresent,
          navLink: '/company?tab=company-info',
        },
        {
          title: 'Add Users (Optional)',
          description: 'Invite team members to join and collaborate.',
          completed: isMembersPresent,
          navLink: '/company?tab=team',
        },
        {
          title: 'Integrations (Optional)',
          description:
            'Connect your ATS or Google Workspace for seamless integration.',
          completed: isIntegrationsPresent,
          navLink: '/integrations',
        },
      ].sort((a, b) => Number(b?.completed) - Number(a?.completed));
      setSteps(newSteps);
      const completedSteps = newSteps.filter((step) => step.completed).length;
      setProgress((completedSteps / newSteps.length) * 100);
    }
  }, [recruiter, integrations, allMembers]);

  return { steps, progress, isCompanyDetailsPending, isLoading };
}
