import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

import { CompanySetting, NavSublink } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import CompanyInfoComp from './CompanyInfoComp';
import {
  generateDepartments,
  generateRoles,
  generateTechnologies,
} from './utils';
import LoaderGrey from '../Common/LoaderGrey';

const CompanyDetailComp = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (recruiter?.id) {
      if (!localStorage?.getItem('departments')) {
        generateDepartments(recruiter.industry);
      }
      if (!localStorage?.getItem('technologies')) {
        generateTechnologies(recruiter.industry);
      }
      if (!localStorage?.getItem('roles')) {
        generateRoles(recruiter.industry);
      }
    }
  }, [recruiter]);

  useEffect(() => {
    if (router.isReady && !router.query?.tab) {
      router.replace('/company?tab=basic-info');
    }
  }, [router]);

  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const isTeamEnabled = posthog.isFeatureEnabled('isTeamEnabled');

  return (
    <Stack overflow={'hidden'}>
      <CompanySetting
        slotNavSublink={
          <>
            <NavSublink
              isActive={router.query?.tab === 'basic-info'}
              textLink={'Basic Info'}
              onClickNav={{
                onClick: () => {
                  router.replace('/company?tab=basic-info');
                },
              }}
            />
            <NavSublink
              textLink={'Additional Info'}
              isActive={router.query?.tab === 'additional-info'}
              onClickNav={{
                onClick: () => {
                  router.replace('/company?tab=additional-info');
                },
              }}
            />
            <NavSublink
              textLink={'About Company'}
              isActive={router.query?.tab === 'about'}
              onClickNav={{
                onClick: () => {
                  router.replace('/company?tab=about');
                },
              }}
            />
            {isAssesEnabled && (
              <NavSublink
                textLink={'Assessment Settings'}
                isActive={router.query?.tab === 'assessment'}
                onClickNav={{
                  onClick: () => {
                    router.replace('/company?tab=assessment');
                  },
                }}
              />
            )}
            <NavSublink
              textLink={'Email Settings'}
              isActive={router.query?.tab === 'email'}
              onClickNav={{
                onClick: () => {
                  router.replace('/company?tab=email');
                },
              }}
            />
            {isTeamEnabled && (
              <NavSublink
                textLink={'Team Settings'}
                isActive={router.query?.tab === 'team'}
                onClickNav={{
                  onClick: () => {
                    router.replace('/company?tab=team');
                  },
                }}
              />
            )}
          </>
        }
        slotSavingLottie={<LoaderGrey />}
        isSaving={isSaving}
        isSaved={!isSaving}
        slotCompany={<CompanyInfoComp setIsSaving={setIsSaving} />}
      />
    </Stack>
  );
};

export default CompanyDetailComp;
