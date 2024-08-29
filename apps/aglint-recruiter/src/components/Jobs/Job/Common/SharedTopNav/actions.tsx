/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils';
import { CircularProgress, Dialog, Popover } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import React, {
  createContext,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CloseJobModal } from '@/devlink/CloseJobModal';
import { FilterOption } from '@/devlink/FilterOption';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { Text } from '@/devlink/Text';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { ButtonGhost } from '@/devlink3/ButtonGhost';
import { GlobalSwitch } from '@/devlink3/GlobalSwitch';
import { GlobalSwitchPill } from '@/devlink3/GlobalSwitchPill';
import { ScoreSetting } from '@/devlink3/ScoreSetting';
import AssessmentIcon from '@/src/components/Common/ModuleIcons/assessmentIcon';
import EmailTemplateIcon from '@/src/components/Common/ModuleIcons/emailTemplateIcon';
import HiringTeamIcon from '@/src/components/Common/ModuleIcons/hiringTeamIcon';
import JobDetailsIcon from '@/src/components/Common/ModuleIcons/jobDetailsIcon';
import ProfileScoreIcon from '@/src/components/Common/ModuleIcons/profileScoreIcon';
import SchedulingIcon from '@/src/components/Common/ModuleIcons/schedulingIcon';
import ScreeningIcon from '@/src/components/Common/ModuleIcons/screeningIcon';
import WorkflowIcon from '@/src/components/Common/ModuleIcons/workflowIcon';
import PublishButton from '@/src/components/Common/PublishButton';
import UITextField from '@/src/components/Common/UITextField';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { ModeToggle } from '@/src/components/shadcn/mode-toggle';
import { Button } from '@/src/components/shadcn/ui/button';
import V0Button from '@/src/components/shadcn/v0-button';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import { useJobs } from '@/src/context/JobsContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';

import { UploadApplications } from '../UploadApplications';

export const SharedActions = () => {
  const value = useSettingsActions();
  return (
    <SettingsContext.Provider value={value}>
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        <Button>Click me!</Button>
        <ModeToggle />
        <V0Button />
        <Score />
        <Sync />
        <Add />
        <Publish />
        <Switcher />
        <Dropdown />
      </Stack>
    </SettingsContext.Provider>
  );
};

const Sync = () => {
  const { job, handleJobSync } = useJob();
  const [load, setLoad] = useState(false);
  if (job?.posted_by !== 'Greenhouse') return <></>;
  const time = dayjsLocal().diff(
    dayjsLocal(job?.remote_sync_time ?? new Date()),
    'minutes',
  );
  const handleSync = async () => {
    if (load) return;
    setLoad(true);
    await handleJobSync();
    setLoad(false);
  };

  return (
    <Stack direction={'row'}>
      <Text
        content={
          time
            ? `Last synced ${time} minute${time === 1 ? '' : 's'} ago`
            : 'Last synced few seconds ago'
        }
        size={1}
        color={'neutral'}
      />
      <OptimisticWrapper loading={load}>
        <ButtonGhost
          size={2}
          isLeftIcon
          iconName={'sync'}
          color={'accent'}
          textButton={'Sync job'}
          onClickButton={{ onClick: async () => await handleSync() }}
        />
      </OptimisticWrapper>
    </Stack>
  );
};

const Score = () => {
  const { applicationScoringPollEnabled, job, total } = useJob();
  if (!applicationScoringPollEnabled) return <></>;
  return (
    <ScoreSetting
      textScoreCount={`${
        job?.processing_count.processed +
        job?.processing_count.unavailable +
        job?.processing_count.unparsable
      }/${total ?? '---'}`}
      slotScoringLoader={
        <Stack sx={{ width: '12px', aspectRatio: 1 }}>
          <CircularProgress
            color='inherit'
            size={'100%'}
            sx={{ color: 'var(--white)' }}
          />
        </Stack>
      }
    />
  );
};

const Add = () => {
  const { job, manageJob } = useJob();
  const { setImportPopup } = useApplicationsStore(({ setImportPopup }) => ({
    setImportPopup,
  }));
  if (job?.status === 'closed' || !manageJob) return <></>;
  return (
    <>
      <ButtonSoft
        size={2}
        color='neutral'
        textButton='Add candidates'
        onClickButton={{ onClick: () => setImportPopup(true) }}
        isLeftIcon
        iconName='person_add'
      />
      <UploadApplications />
    </>
  );
};

const Publish = () => {
  const { handlePublish, canPublish, manageJob, job } = useJob();
  if (job?.status === 'closed' || !manageJob) return <></>;
  return (
    <PublishButton
      onClick={async () => await handlePublish()}
      disabled={!canPublish}
    />
  );
};

const Switcher = () => {
  const { handlePush, currentPath } = useSettings();
  return (
    <GlobalSwitch
      slotGlobalSwitchPill={
        <>
          <GlobalSwitchPill
            textPill={'Applications'}
            isActive={currentPath === '/jobs/[id]'}
            onClickPill={{ onClick: () => handlePush('/jobs/[id]') }}
          />
          <GlobalSwitchPill
            textPill={'Metrics'}
            isActive={currentPath === '/jobs/[id]/metrics'}
            onClickPill={{ onClick: () => handlePush('/jobs/[id]/metrics') }}
          />
        </>
      }
    />
  );
};

const useSettingsActions = () => {
  const { push, pathname } = useRouter();
  const { handleJobDelete } = useJobs();
  const { job, handleJobAsyncUpdate } = useJob();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [modal, setModal] = useState(false);

  const isDelete = job?.status !== 'published';

  const handleDeleteJob = useCallback(() => {
    push(`${ROUTES['/jobs']()}?status=${job?.status ?? 'all'}`);
    handleJobDelete(job.id);
  }, [job?.id]);

  const handleCloseModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleModalSubmit = useCallback(async () => {
    handleCloseModal();
    switch (job.status) {
      case 'draft':
        handleDeleteJob();
        break;
      case 'published':
        await handleJobAsyncUpdate({ status: 'closed' });
        break;
      case 'closed':
        handleDeleteJob();
        break;
    }
  }, [job?.status, handleCloseModal]);

  const handlePush = <
    T extends Extract<keyof R, `/jobs/${string}`>,
    R extends typeof ROUTES = typeof ROUTES,
  >(
    type: T,
  ) => {
    setAnchorEl(null);
    //@ts-expect-error
    push(ROUTES[type]({ id: job?.id }));
  };

  return {
    job,
    anchorEl,
    setAnchorEl,
    modal,
    setModal,
    isDelete,
    handleCloseModal,
    handleModalSubmit,
    handlePush,
    currentPath: pathname as Extract<keyof typeof ROUTES, `/jobs/${string}`>,
  };
};

const SettingsContext =
  createContext<ReturnType<typeof useSettingsActions>>(undefined);

const useSettings = () => useContext(SettingsContext);

export const Settings = memo(() => {
  const value = useSettingsActions();
  return (
    <SettingsContext.Provider value={value}>
      <Dropdown />
    </SettingsContext.Provider>
  );
});
Settings.displayName = 'Settings';

const Dropdown = () => {
  const { modal, setAnchorEl } = useSettings();
  return (
    <>
      <IconButtonGhost
        color={'neutral'}
        iconSize={6}
        iconName='more_vert'
        onClickButton={{
          onClick: (e) => setAnchorEl(e.currentTarget),
        }}
      />
      <Pop>
        <Modules />
        <CloseJob />
      </Pop>
      {modal && <Close />}
    </>
  );
};

const Pop = ({ children }: PropsWithChildren) => {
  const { anchorEl, setAnchorEl } = useSettings();
  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            border: 'none !important',
            background: 'transparent',
            overflow: 'visible !important',
            boxShadow: 'none',
          },
        }}
      >
        <Stack border={'1px solid var(--neutral-6)'} borderRadius={'8px'}>
          <FilterDropdown
            isRemoveVisible={false}
            isResetVisible={false}
            slotOption={<>{children}</>}
          />
        </Stack>
      </Popover>
    </>
  );
};

const Close = () => {
  const { job, modal, handleModalSubmit, handleCloseModal, isDelete } =
    useSettings();
  const [value, setValue] = useState('');
  const job_title = job?.job_title ?? '';
  return (
    <Dialog open={modal} onClose={() => handleCloseModal()}>
      <CloseJobModal
        textPopupTitle={`${isDelete ? 'Delete' : 'Close'}  This Job`}
        textWarning={
          isDelete
            ? 'Deleting this job will permanently remove all related data and make the job inaccessible. Candidate data will remain unaffected.'
            : 'Closing this job will permanently stop all activities, including tasks and scheduled interviews. It will also remove the job from the company page and prevent any new applications or candidate imports.'
        }
        textButton={isDelete ? 'Delete Job' : 'Close Job'}
        textJobTitle={job_title.trim()}
        onClickCloseJob={{ onClick: () => handleCloseModal() }}
        textLocation={''}
        slotInput={
          <UITextField
            placeholder={job_title.trim()}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        }
        slotButton={
          <>
            <ButtonSoft
              color={'neutral'}
              textButton='Cancel'
              size={2}
              onClickButton={{ onClick: () => handleCloseModal() }}
            />
            <ButtonSolid
              textButton={isDelete ? 'Delete Job' : 'Close Job'}
              color={isDelete ? 'error' : 'accent'}
              size={2}
              onClickButton={{ onClick: handleModalSubmit }}
              isDisabled={job_title.trim() !== value.trim()}
            />
          </>
        }
      />
    </Dialog>
  );
};

const Modules = () => {
  const { manageJob } = useJob();
  const { currentPath } = useSettings();
  const {
    isAssessmentEnabled,
    isScreeningEnabled,
    isSchedulingEnabled,
    isScoringEnabled,
  } = useRolesAndPermissions();
  if (!manageJob)
    return (
      <>
        <WorkflowModule />
      </>
    );
  return (
    <>
      {currentPath !== '/jobs/[id]/job-details' && <JobDetailsModule />}
      {currentPath !== '/jobs/[id]/profile-score' && isScoringEnabled && (
        <ProfileScoreModule />
      )}
      {currentPath !== '/jobs/[id]/hiring-team' && <HiringTeamModule />}
      {currentPath !== '/jobs/[id]/interview-plan' && isSchedulingEnabled && (
        <InterviewModule />
      )}
      {currentPath !== '/jobs/[id]/assessment' && isAssessmentEnabled && (
        <AssessmentModule />
      )}
      {currentPath !== '/jobs/[id]/screening' && isScreeningEnabled && (
        <ScreeningModule />
      )}
      {/* {currentPath !== '/jobs/[id]/email-templates' && <EmailTemplatesModule />} */}
      {currentPath !== '/jobs/[id]/workflows' && <WorkflowModule />}
    </>
  );
};

const WorkflowModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/workflows'),
      }}
      text={'Workflows'}
      slotIcon={<WorkflowIcon />}
      color={'black'}
    />
  );
};

const HiringTeamModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/hiring-team'),
      }}
      text={'Hiring Team'}
      slotIcon={<HiringTeamIcon />}
      color={'black'}
    />
  );
};

const ProfileScoreModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/profile-score'),
      }}
      text={'Profile Score'}
      slotIcon={<ProfileScoreIcon />}
      color={'black'}
    />
  );
};

const JobDetailsModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/job-details'),
      }}
      text={'Job Details'}
      slotIcon={<JobDetailsIcon />}
      color={'black'}
    />
  );
};

const AssessmentModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/assessment'),
      }}
      text={'Assessment'}
      slotIcon={<AssessmentIcon />}
      color={'black'}
    />
  );
};

// eslint-disable-next-line no-unused-vars
const EmailTemplatesModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/email-templates'),
      }}
      text={'Email Templates'}
      slotIcon={<EmailTemplateIcon />}
      color={'black'}
    />
  );
};

const ScreeningModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/screening'),
      }}
      text={'Screening'}
      slotIcon={<ScreeningIcon />}
      color={'black'}
    />
  );
};

const InterviewModule = () => {
  const { handlePush } = useSettings();
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => handlePush('/jobs/[id]/interview-plan'),
      }}
      text={'Interview Plan'}
      slotIcon={<SchedulingIcon />}
      color={'black'}
    />
  );
};

const CloseJob = () => {
  const { setAnchorEl, setModal } = useSettings();
  const { job } = useJob();
  const isDelete = job?.status !== 'published';
  return (
    <FilterOption
      onClickCancelInvite={{
        onClick: () => {
          setModal(true);
          setAnchorEl(null);
        },
      }}
      text={`${isDelete ? 'Delete' : 'Close'} Job`}
      slotIcon={
        <GlobalIcon size={4} iconName={isDelete ? 'delete' : 'close'} />
      }
      color={'black'}
    />
  );
};
