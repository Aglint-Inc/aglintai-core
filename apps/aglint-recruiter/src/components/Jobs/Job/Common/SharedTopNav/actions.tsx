import { CircularProgress, Dialog, Popover, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CloseJobModal } from '@/devlink/CloseJobModal';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { ScoreSetting } from '@/devlink3/ScoreSetting';
import PublishButton from '@/src/components/Common/PublishButton';
import UITextField from '@/src/components/Common/UITextField';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import { useJobs } from '@/src/context/JobsContext';
import ROUTES from '@/src/utils/routing/routes';

import { UploadApplications } from '../UploadApplications';

export const SharedActions = () => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={2}>
      <Score />
      <Add />
      <Publish />
      <Close />
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

const Close = () => {
  const { push } = useRouter();
  const { handleJobDelete } = useJobs();
  const { job, handleJobAsyncUpdate } = useJob();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteJob = useCallback(() => {
    push(`${ROUTES['/jobs']()}?status=${job?.status ?? 'all'}`);
    handleJobDelete(job.id);
  }, [job.id]);
  const handleSubmit = useCallback(async () => {
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
  }, [job.status]);
  return (
    <>
      <IconButtonGhost
        color={'neutral'}
        iconSize={6}
        iconName='more_vert'
        onClickButton={{
          onClick: handleClick,
        }}
      />
      <JobClose
        popover={anchorEl}
        onClose={() => setAnchorEl(null)}
        onSubmit={() => handleSubmit()}
      />
    </>
  );
};

const JobClose = ({
  popover,
  onClose,
  onSubmit,
}: {
  popover: HTMLButtonElement | null;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const {
    job: { job_title, status },
  } = useJob();
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState('');
  const handleClose = () => {
    setModal(false);
    setTimeout(() => setValue(''), 400);
  };
  const openModal = () => {
    onClose();
    setModal(true);
  };
  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };
  const isDelete = status !== 'published';
  const open = Boolean(popover);
  return (
    <>
      <Popover
        open={open}
        anchorEl={popover}
        onClose={() => onClose()}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
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
            // top: '62px !important',
          },
        }}
      >
        {/* <CloseDeleteJob
          isCloseJobVisible={!isDelete}
          isDeleteJobVisible={isDelete}
          slotButton={
            <ButtonSolid
              textButton={`${isDelete ? 'Delete' : 'Close'} Job`}
              size={2}
              color={isDelete ? 'error' : 'accent'}
              onClickButton={{ onClick: () => openModal() }}
            />
          }
        /> */}
        <Stack border={'1px solid var(--neutral-6)'} borderRadius={'8px'}>
          <FilterDropdown
            isRemoveVisible={false}
            isResetVisible={false}
            slotOption={
              <Stack spacing={2} maxHeight={'50vh'} overflow={'auto'}>
                <Stack
                  direction={'row'}
                  sx={{
                    alignItems: 'center',
                    ':hover': { bgcolor: 'var(--neutral-2)' },
                    borderRadius: 'var(--radius-2)',
                  }}
                  spacing={1}
                  // padding={'var(--space-2) var(--space-3)'}
                  marginTop={'0px !important'}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: '5px 10px ',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: 'var(--error-11)',
                    }}
                    onClick={() => openModal()}
                  >
                    <GlobalIcon
                      iconName={isDelete ? 'delete' : 'close'}
                      size={4}
                    />
                    {`${isDelete ? 'Delete' : 'Close'} Job`}
                  </Typography>
                </Stack>
              </Stack>
            }
          />
        </Stack>
      </Popover>
      <Dialog open={modal} onClose={() => handleClose()}>
        <CloseJobModal
          textPopupTitle={`${isDelete ? 'Delete' : 'Close'}  This Job`}
          textWarning={
            isDelete
              ? 'Deleting this job will permanently remove all related data and make the job inaccessible. Candidate data will remain unaffected.'
              : 'Closing this job will permanently stop all activities, including tasks and scheduled interviews. It will also remove the job from the company page and prevent any new applications or candidate imports.'
          }
          textButton={isDelete ? 'Delete Job' : 'Close Job'}
          textJobTitle={job_title.trim()}
          onClickCloseJob={{ onClick: () => handleClose() }}
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
                onClickButton={{ onClick: () => handleClose() }}
              />
              <ButtonSolid
                textButton={isDelete ? 'Delete Job' : 'Close Job'}
                color={isDelete ? 'error' : 'accent'}
                size={2}
                onClickButton={{ onClick: handleSubmit }}
                isDisabled={job_title.trim() !== value.trim()}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
};
