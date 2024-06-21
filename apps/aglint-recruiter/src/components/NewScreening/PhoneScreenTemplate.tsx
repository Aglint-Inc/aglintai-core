import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { CreateNewJob } from '@/devlink/CreateNewJob';
import { SavedChanges } from '@/devlink/SavedChanges';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { usePhoneScreening } from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

import Seo from '../Common/Seo';
import ScreeningComp from './TemplateComps/ScreeningComp';
import ScreeningSideBar from './TemplateComps/SideBar';

export const ScreeningDashboardBread = () => {
  const router = useRouter();
  const { phoneScreenignForm } = usePhoneScreening();
  return (
    <>
      <Breadcrum
        textName={`Screening`}
        isLink={true}
        onClickLink={{
          onClick: () => {
            router.push('/screening');
          },
        }}
      />
      <Breadcrum textName={phoneScreenignForm.title} showArrow={true} />
    </>
  );
};

const PhoneScreenTemplate = () => {
  const { phoneScreenignForm } = usePhoneScreening();
  return (
    <>
      <Seo
        title='Phone Screening | Aglint AI'
        description='AI for People Products'
      />
      <PageLayout
        slotTopbarLeft={<ScreeningDashboardBread />}
        slotBody={
          <CreateNewJob
            isHeaderVisible={false}
            isSideNavVisible={false}
            isDetailsActive={false}
            isEmailTemplateActive={false}
            isScreeningQuestionsActive={false}
            isScoreSettingActive={false}
            isWorkflowsActive={false}
            textJobName={false}
            isScreeningActive
            isProceedVisible={false}
            slotCreateJob={
              <>
                <ScreeningComp />
              </>
            }
            slotSavedChanges={
              <>
                <SyncStatus status={phoneScreenignForm.syncStatus} />
              </>
            }
            slotSideSection={<ScreeningSideBar />}
          />
        }
      />
    </>
  );
};

export default PhoneScreenTemplate;

export const SyncStatus = ({ status }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (status === 'saving') {
      setShow(true);
    } else if (status === 'saved') {
      setTimeout(() => {
        setShow(false);
      }, 10000);
    }
  }, [status]);

  if (show && status === 'saving') {
    return (
      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
        <SavedChanges
          slotLoaderIcon={
            <>
              <CircularProgress
                color='inherit'
                size={'15px'}
                sx={{ color: 'var(--neutral-6)' }}
              />
            </>
          }
          isSaved={status !== 'saving'}
          isSaving={status === 'saving'}
        />
      </Stack>
    );
  }

  if (show && status === 'saved') {
    return (
      <SavedChanges
        slotLoaderIcon={<></>}
        isSaved={status === 'saved'}
        isSaving={status !== 'saved'}
      />
      // <Stack direction={'row'} gap={0.5} alignItems={'center'}>
      //   <UITypography color={'var(--success-11)'} type='small' fontBold='normal'>
      //     Saved to draft
      //   </UITypography>
      //   <Image
      //     alt='save'
      //     width={'14'}
      //     height={'14'}
      //     src={'/images/svg/greenCheck.svg'}
      //   />
      // </Stack>
    );
  }

  return <></>;
};
