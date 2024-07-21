import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CompanySetting } from '@/devlink/CompanySetting';
import { NavSublink } from '@/devlink/NavSublink';
import { SavedChanges } from '@/devlink/SavedChanges';
import LoaderGrey from '@/public/lottie/LoaderGrey';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';

import CompanyInfoComp from './CompanyInfoComp';
import {
  generateDepartments,
  generateRoles,
  generateSpecialities,
  tabs,
} from './utils';

const CompanyDetailComp = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const { ifAllowed } = useRolesAndPermissions();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (recruiter?.id) {
      if (!localStorage?.getItem('departments')) {
        generateDepartments(recruiter.industry);
      }
      if (!localStorage?.getItem('specialities')) {
        generateSpecialities(recruiter.industry);
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

  useEffect(() => {
    if (!isSaved && isSaving) setIsSaved(true);
  }, [isSaving]);

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
                  router.replace(`/company?tab=${tabs.basicinfo}`);
                },
              }}
            />
            <NavSublink
              textLink={'Additional Info'}
              isActive={router.query?.tab === 'additional-info'}
              onClickNav={{
                onClick: () => {
                  router.replace(`/company?tab=${tabs.additionalinfo}`);
                },
              }}
            />
            {ifAllowed(
              <NavSublink
                textLink={'Users'}
                isActive={router.query?.tab === 'team'}
                onClickNav={{
                  onClick: () => {
                    router.replace('/company?tab=team');
                  },
                }}
              />,
              ['view_users'],
            )}
            {ifAllowed(
              <NavSublink
                textLink={'Roles'}
                isActive={router.query?.tab === 'roles'}
                onClickNav={{
                  onClick: () => {
                    router.replace('/company?tab=roles');
                  },
                }}
              />,
              ['view_roles'],
            )}
          </>
        }
        slotSavedChanges={
          <SavedChanges
            slotLoaderIcon={
              <>
                <CircularProgress
                  color='inherit'
                  size={'16px'}
                  sx={{ color: 'var(--neutral-6)' }}
                />
              </>
            }
            isSaved={!isSaving}
            isSaving={isSaving}
          />
        }
        slotSavingLottie={<LoaderGrey />}
        isSaved={isSaved}
        slotCompany={<CompanyInfoComp setIsSaving={setIsSaving} />}
      />
    </Stack>
  );
};

export default CompanyDetailComp;
