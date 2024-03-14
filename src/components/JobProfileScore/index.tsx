/* eslint-disable security/detect-object-injection */
import { Popover, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import {
  AddButton,
  ButtonPrimarySmall,
  Checkbox,
  ScoreCard,
  ScoreCardEdit,
  ScorePillMust,
  ScorePillNice,
  ScoreSetting
} from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
import { useJobDetails } from '@/src/context/JobDashboard';
import NotFoundPage from '@/src/pages/404';

import Loader from '../Common/Loader';
import UITextField from '../Common/UITextField';
const JobProfileScoreDashboard = () => {
  const { initialLoad, job } = useJobDetails();

  return initialLoad ? (
    job !== undefined && job.status !== 'closed' ? (
      <ProfileScorePage />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const ProfileScorePage = () => {
  return (
    <>
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotBody={
          <Stack margin={2}>
            <ProfileScore />
          </Stack>
        }
      />
    </>
  );
};

const ProfileScore = () => {
  const ref = useRef();
  return (
    <ScoreSetting
      onClickDismiss={() => {}}
      onClickRegenerate={() => {}}
      isEmptyWarningVisible
      isRegenerateVisible
      slotScoreCardDetails={
        <>
          <ScoreCard
            colorPropsHeading={{ style: { backgroundColor: 'green' } }}
            textHeading={'LLLL'}
            slotScorePills={
              <>
                <ScorePillMust
                  onClickEditText={() => {}}
                  textDetails={'okijn'}
                />
                <ScorePillNice
                  onClickEditText={() => {}}
                  textDetails={'askdjn'}
                />
              </>
            }
          />
          <ScoreCard
            slotAddButton={
              <>
                <Stack ref={ref}>
                  <AddButton textAddButton={'oijjbh'} onClickAdd={() => {}} />
                  <Popover
                    open={false}
                    anchorEl={ref.current}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    sx={{
                      '& .MuiPaper-outlined': {
                        border: 'none',
                        outline: 'none'
                      }
                    }}
                  >
                    <ScoreCardEdit
                      slotCheckBox={<Checkbox />}
                      slotTextEdit={<UITextField width='300px' />}
                      isCancelVisible
                      isDeleteVisible
                      onClickCancel={() => {}}
                      onClickDelete={() => {}}
                      textEdit={'KKKKK'}
                      slotButtonUpdate={<ButtonPrimarySmall />}
                    />
                  </Popover>
                </Stack>
              </>
            }
          />
          <ScoreCard />
        </>
      }
    />
  );
};

//Experience form must be big

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJobDetails();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' }
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' }
        }}
        showArrow
      />
      <Breadcrum textName={`Profile Score`} showArrow />
    </>
  );
};

export default JobProfileScoreDashboard;
