import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CompanySetting, NavSublink } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import AssessmentSettings from './AssessmentSettings';
import Assistant from './Assistant';
import CompanyInfoComp from './CompanyInfoComp';
import CompanyJdComp from './CompanyJdComp';
import EmailTemplate from './EmailTemplate';
import TeamManagement from './TeamManagement';
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
          </>
        }
        slotSavingLottie={<LoaderGrey />}
        isSaving={isSaving}
        isSaved={!isSaving}
        slotCompany={<CompanyInfoComp setIsSaving={setIsSaving} />}
        slotCompanyJdSetting={<CompanyJdComp setIsSaving={setIsSaving} />}
        slotEmailTemplate={<EmailTemplate />}
        slotTeam={<TeamManagement />}
        slotAssesmentSetting={<AssessmentSettings setIsSaving={setIsSaving} />}
        slotAssisstantSettings={<Assistant />}
      />
    </Stack>
  );
};

export default CompanyDetailComp;
