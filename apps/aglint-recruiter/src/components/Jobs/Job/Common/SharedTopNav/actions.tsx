/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils';
import { CircularProgress, Dialog } from '@mui/material';
import {
  BarChart,
  Calendar,
  FileText,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  UserPlus,
  Workflow,
  XCircle
} from 'lucide-react';
import { useRouter } from 'next/router';
import { createContext, memo, useCallback, useContext, useState } from 'react';

import OptimisticWrapper from '@/components/loadingWapper';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CloseJobModal } from '@/devlink/CloseJobModal';
import { ScoreSetting } from '@/devlink3/ScoreSetting';
import UITextField from '@/src/components/Common/UITextField';
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
      <div className='flex flex-row items-center gap-2'>
        <Score />
        <Sync />
        <Add />
        <Publish />
        <Switcher />
        <Dropdown />
      </div>
    </SettingsContext.Provider>
  );
};

const Sync = () => {
  const { job, handleJobSync } = useJob();
  const [load, setLoad] = useState(false);
  if (job?.posted_by !== 'Greenhouse') return null;
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
    <div className='flex flex-row gap-1'>
      <div className='flex-shrink-0 flex items-center'>
        <p className='text-neutral-500 text-sm'>
          {time
            ? `Last synced ${time} minute${time === 1 ? '' : 's'} ago`
            : 'Last synced few seconds ago'}
        </p>
      </div>

      <OptimisticWrapper loading={load}>
        <Button variant='outline' onClick={handleSync} className='w-auto'>
          <RefreshCw className='w-3 h-5 mr-3' strokeWidth={1.5} />
          Sync job
        </Button>
      </OptimisticWrapper>
    </div>
  );
};

const Score = () => {
  const { applicationScoringPollEnabled, job, total } = useJob();
  if (!applicationScoringPollEnabled) return null;
  return (
    <ScoreSetting
      textScoreCount={`${
        job?.processing_count.processed +
        job?.processing_count.unavailable +
        job?.processing_count.unparsable
      }/${total ?? '---'}`}
      slotScoringLoader={
        <div className='w-3 aspect-square'>
          <CircularProgress
            color='inherit'
            size={'100%'}
            className='text-white'
          />
        </div>
      }
    />
  );
};

const Add = () => {
  const { job, manageJob } = useJob();
  const { setImportPopup } = useApplicationsStore(({ setImportPopup }) => ({
    setImportPopup,
  }));
  if (job?.status === 'closed' || !manageJob) return null;
  return (
    <>
      <Button
        variant='outline'
        onClick={() => setImportPopup(true)}
        className='w-auto'
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        Add candidates
      </Button>
      <UploadApplications />
    </>
  );
};

const Publish = () => {
  const { handlePublish, canPublish, manageJob, job } = useJob();
  if (job?.status === 'closed' || !manageJob) return null;
  return (
    <Button onClick={async () => await handlePublish()} disabled={!canPublish}>
      Publish
    </Button>
  );
};

const Switcher = () => {
  const { handlePush, currentPath } = useSettings();
  return (
    <Tabs
      defaultValue={currentPath === '/jobs/[id]' ? 'applications' : 'metrics'}
    >
      <TabsList>
        <TabsTrigger
          value='applications'
          onClick={() => handlePush('/jobs/[id]')}
        >
          Applications
        </TabsTrigger>
        <TabsTrigger
          value='metrics'
          onClick={() => handlePush('/jobs/[id]/metrics')}
        >
          Metrics
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const useSettingsActions = () => {
  const { push, pathname } = useRouter();
  const { handleJobDelete } = useJobs();
  const { job, handleJobAsyncUpdate } = useJob();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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
  const { modal } = useSettings();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='h-8 w-8 rounded-md'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <Modules />
          <CloseJob />
        </DropdownMenuContent>
      </DropdownMenu>
      {modal && <Close />}
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
            <Button
              variant='outline'
              onClick={() => handleCloseModal()}
              className='w-auto'
            >
              Cancel
            </Button>
            <Button
              onClick={handleModalSubmit}
              className='w-auto'
              disabled={job_title.trim() !== value.trim()}
            >
              {isDelete ? 'Delete Job' : 'Close Job'}
            </Button>
          </>
        }
      />
    </Dialog>
  );
};

const Modules = () => {
  const { manageJob } = useJob();
  const { currentPath } = useSettings();
  const { isSchedulingEnabled, isScoringEnabled } = useRolesAndPermissions();
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

      {currentPath !== '/jobs/[id]/workflows' && <WorkflowModule />}
    </>
  );
};

const WorkflowModule = () => {
  const { handlePush } = useSettings();
  return (
    <DropdownMenuItem onSelect={() => handlePush('/jobs/[id]/workflows')}>
      <Workflow className='mr-2 h-4 w-4' />
      <span>Workflows</span>
    </DropdownMenuItem>
  );
};

const HiringTeamModule = () => {
  const { handlePush } = useSettings();
  return (
    <DropdownMenuItem onSelect={() => handlePush('/jobs/[id]/hiring-team')}>
      <UserPlus className='mr-2 h-4 w-4' />
      <span>Hiring Team</span>
    </DropdownMenuItem>
  );
};

const ProfileScoreModule = () => {
  const { handlePush } = useSettings();
  return (
    <DropdownMenuItem onSelect={() => handlePush('/jobs/[id]/profile-score')}>
      <BarChart className='mr-2 h-4 w-4' />
      <span>Profile Score</span>
    </DropdownMenuItem>
  );
};

const JobDetailsModule = () => {
  const { handlePush } = useSettings();
  return (
    <DropdownMenuItem onSelect={() => handlePush('/jobs/[id]/job-details')}>
      <FileText className='mr-2 h-4 w-4' />
      <span>Job Details</span>
    </DropdownMenuItem>
  );
};

const InterviewModule = () => {
  const { handlePush } = useSettings();
  return (
    <DropdownMenuItem onSelect={() => handlePush('/jobs/[id]/interview-plan')}>
      <Calendar className='mr-2 h-4 w-4' />
      <span>Interview Plan</span>
    </DropdownMenuItem>
  );
};

const CloseJob = () => {
  const { setAnchorEl, setModal } = useSettings();
  const { job } = useJob();
  const isDelete = job?.status !== 'published';
  return (
    <DropdownMenuItem
      onSelect={() => {
        setModal(true);
        setAnchorEl(null);
      }}
    >
      <XCircle className='mr-2 h-4 w-4' />
      <span>{isDelete ? 'Delete' : 'Close'} Job</span>
    </DropdownMenuItem>
  );
};
