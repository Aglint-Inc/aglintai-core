/* eslint-disable security/detect-object-injection */
import CloseIcon from '@mui/icons-material/Close';
import { Collapse, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';

import {
  DeleteJobPopup,
  DelJobBtn,
  JobStatus,
  JobStatusSelectBlock,
  RecPrimaryBtn,
  ToggleSelectDropdown
} from '@/devlink2';
import { ButtonDangerOutlinedRegular } from '@/devlink3/ButtonDangerOutlinedRegular';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { useJobs } from '@/src/context/JobsContext';
import { StatusJobs } from '@/src/types/data.types';

import MuiPopup from '../../Common/MuiPopup';
import SidePanelDrawer from '../../Common/SidePanelDrawer';
import SpecializedDatePicker from '../../Common/SpecializedDatePicker';
import UITextField from '../../Common/UITextField';
import { capitalize } from '../utils';

const JobApplicationStatus = () => {
  const { job } = useJobApplications();
  const { jobsData } = useJobs();
  const status = jobsData.jobs.find((j) => j.id === job.id).active_status;
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const sourcingStatusInfo = getStatusInfo(status.sourcing, 'sourcing');
  const interviewingStatusInfo = getStatusInfo(
    status.interviewing,
    'interviewing'
  );
  return status.closed.isActive ? (
    <></>
  ) : (
    <>
      <SidePanelDrawer
        openSidePanelDrawer={openSidePanel}
        setOpenPanelDrawer={setOpenSidePanel}
        onClose={() => setOpenSidePanel(false)}
      >
        <Stack p={'26px'} gap={'15px'}>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Stack fontFamily={'14px'} fontWeight={600}>
              Sourcing and Interviewing
            </Stack>
            <IconButton onClick={() => setOpenSidePanel(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <SideDrawerContent status={status} statusInfo={sourcingStatusInfo} />
          <SideDrawerContent
            status={status}
            statusInfo={interviewingStatusInfo}
          />
          <CloseJob status={status} />
        </Stack>
      </SidePanelDrawer>
      <JobStatus
        title={capitalize('sourcing')}
        onClickStatus={{ onClick: () => setOpenSidePanel(true) }}
        isActive={sourcingStatusInfo.active}
        isScheduled={sourcingStatusInfo.scheduled}
        isInactive={sourcingStatusInfo.inactive}
        textDate={sourcingStatusInfo.primaryStatus}
      />
      <JobStatus
        title={capitalize('interviewing')}
        onClickStatus={{ onClick: () => setOpenSidePanel(true) }}
        isActive={interviewingStatusInfo.active}
        isScheduled={interviewingStatusInfo.scheduled}
        isInactive={interviewingStatusInfo.inactive}
        textDate={interviewingStatusInfo.primaryStatus}
      />
    </>
  );
};

type Flow = 'sourcing' | 'interviewing';
type Status = StatusJobs;
type StatusInfo = {
  flow: Flow;
  active: boolean;
  scheduled: boolean;
  inactive: boolean;
  style: {
    color: string;
  };
  primaryStatus: string;
  secondaryStatus: string;
};

const CloseJob = ({ status }: { status: Status }) => {
  const { job } = useJobApplications();
  const { handleJobAsyncUpdate } = useJobs();
  const [close, setClose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const handleJobClose = async () => {
    setLoading(true);
    await handleJobAsyncUpdate(job.id, {
      active_status: {
        sourcing: {
          ...status.sourcing,
          isActive: false
        },
        interviewing: {
          ...status.interviewing,
          isActive: false
        },
        closed: {
          isActive: true,
          timeStamp: new Date().toISOString()
        }
      }
    });
    setLoading(false);
    setClose(false);
  };
  const form = (
    <UITextField
      placeholder={job.job_title}
      onChange={(e) => {
        setText(e.currentTarget.value);
      }}
    ></UITextField>
  );
  return (
    <>
      <MuiPopup props={{ open: close }}>
        <Stack
          style={
            loading
              ? {
                  pointerEvents: 'none'
                }
              : {
                  pointerEvents: 'auto'
                }
          }
        >
          <DeleteJobPopup
            jobTitle={job.job_title.trim()}
            jobInfo={job.location.trim()}
            slotForm={form}
            closeProps={{ onClick: () => setClose(false) }}
            isDeleteDisabled={text.trim() !== job.job_title.trim()}
            onClickDelete={{ onClick: async () => await handleJobClose() }}
          />
        </Stack>
      </MuiPopup>
      <DelJobBtn onClick={{ onClick: () => setClose(true) }} />
    </>
  );
};

const SideDrawerContent = ({
  status,
  statusInfo
}: {
  status: Status;
  statusInfo: StatusInfo;
}) => {
  const { handleJobAsyncUpdate } = useJobs();
  const { job } = useJobApplications();
  const jobId = job.id;
  const [loading, setLoading] = useState(false);
  const handleJobStatusInactive = async () => {
    setLoading(true);
    await handleJobAsyncUpdate(jobId, {
      active_status: {
        ...status,
        [statusInfo.flow]: {
          isActive: false,
          timeStamp: null
        }
      }
    });
    setLoading(false);
  };
  return (
    <Stack
      style={
        loading
          ? { opacity: 0.4, pointerEvents: 'none', transition: '0.5s' }
          : { opacity: 1, pointerEvents: 'auto', transition: '0.5s' }
      }
    >
      <ToggleSelectDropdown
        isSourcing={statusInfo.flow === 'sourcing'}
        isInterviewing={statusInfo.flow === 'interviewing'}
        dropdownTitle={capitalize(statusInfo.flow)}
        statusProps={{ style: statusInfo.style }}
        isSchedule={statusInfo.scheduled}
        isNotSchedule={!statusInfo.scheduled}
        slotSelection={
          <>
            <Collapse in={!statusInfo.active}>
              <JobSchedules
                jobId={jobId}
                status={status}
                statusInfo={statusInfo}
                setLoading={setLoading}
                isSchedule={statusInfo.scheduled}
                handleJobStatusInactive={handleJobStatusInactive}
              />
            </Collapse>
            <Collapse in={statusInfo.active}>
              <Stack gap={2}>
                <Stack color={'rgb(128,128,128)'}>
                  {`${capitalize(statusInfo.flow)} is now active`}
                </Stack>
                <Stack width={'75px'}>
                  <ButtonDangerOutlinedRegular
                    buttonText={'Stop'}
                    buttonProps={{
                      onClick: async () => await handleJobStatusInactive()
                    }}
                  />
                </Stack>
              </Stack>
            </Collapse>
          </>
        }
        statusText={statusInfo.secondaryStatus}
      />
    </Stack>
  );
};

export const getStatusInfo = (
  status: { isActive: boolean; timeStamp: string },
  flow: Flow
) => {
  const active = status.isActive;
  const scheduled = status.timeStamp !== null && !status.isActive;
  const inactive = status.timeStamp === null && !status.isActive;
  const style = {
    color:
      status.timeStamp !== null
        ? status.isActive
          ? 'green'
          : 'goldenrod'
        : 'grey'
  };
  const secondaryStatus =
    status.timeStamp !== null
      ? status.isActive
        ? `Active`
        : `Scheduled on ${dayjs(status.timeStamp).format('DD MMM, YYYY')}`
      : `${capitalize(flow)} is off`;
  const primaryStatus =
    status.timeStamp !== null
      ? status.isActive
        ? 'Active'
        : `${dayjs(status.timeStamp).format(
            'DD MMM, YYYY' /*'DD MMM, YYYY, hh:mm a'*/
          )}`
      : 'Off';
  return {
    active,
    scheduled,
    inactive,
    style,
    primaryStatus,
    secondaryStatus,
    flow
  };
};

const JobSchedules = ({
  jobId,
  status,
  statusInfo,
  setLoading,
  isSchedule,
  handleJobStatusInactive
}: {
  jobId: string;
  status: Status;
  statusInfo: StatusInfo;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isSchedule: boolean;
  handleJobStatusInactive: () => Promise<void>;
}) => {
  const flow = statusInfo.flow;
  const [start, setStart] = useState(status[flow].timeStamp ? false : true);
  const timeStamp = status[flow].timeStamp
    ? dayjs(status[flow].timeStamp).format(`YYYY-MM-DDTHH:mm`)
    : dayjs(new Date()).format(`YYYY-MM-DDTHH:mm`);
  const [date, setDate] = useState(timeStamp.split('T')[0]);
  // const [time, setTime] = useState(timeStamp);
  const disabled = !(date /*&& time*/);
  const { handleJobAsyncUpdate } = useJobs();
  const handleJobStatusUpdate = async () => {
    setLoading(true);
    await handleJobAsyncUpdate(jobId, {
      active_status: {
        ...status,
        [flow]: {
          isActive: start,
          timeStamp: start
            ? new Date().toISOString()
            : disabled
              ? null
              : new Date(date).toISOString()
          // : new Date(
          //     `${date.split('T')[0]}T${time.split('T')[1]}`,
          //   ).toISOString(),
        }
      }
    });
    setLoading(false);
  };
  return (
    <JobStatusSelectBlock
      onClickStart={{
        onClick: () => setStart(true),
        style: { cursor: 'pointer' }
      }}
      isStartActive={start}
      onClickSchedule={{
        onClick: () => setStart(false),
        style: { cursor: 'pointer' }
      }}
      isScheduleActive={!start}
      slotBody={
        <JobScheduleBody
          isStart={start}
          date={date}
          setDate={setDate}
          flow={flow}
          // time={time}
          // setTime={setTime}
        />
      }
      slotButtons={
        <>
          {!statusInfo.active && (
            <RecPrimaryBtn
              isDisabled={start ? false : disabled}
              buttonText={getButtonText(isSchedule, start)}
              onClickButton={{
                onClick: async () => await handleJobStatusUpdate()
              }}
            />
          )}
          {(statusInfo.active || statusInfo.scheduled) && (
            <ButtonDangerOutlinedRegular
              buttonText={'Stop'}
              buttonProps={{
                onClick: async () => await handleJobStatusInactive()
              }}
            />
          )}
        </>
      }
      scheduleText={statusInfo.scheduled ? 'Reschedule' : 'Schedule'}
    />
  );
};

const getButtonText = (isSchedule: boolean, isStart: boolean) => {
  return isStart ? 'Start now' : isSchedule ? 'Reschedule' : 'Schedule';
};

const JobScheduleBody = ({
  isStart,
  flow,
  date,
  setDate // time,
  // setTime,
}: {
  isStart: boolean;
  flow: Flow;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  // time: string;
  // setTime: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <Collapse in={isStart}>
        <Stack style={{ color: 'grey' }}>
          {`Proceeding will allow candidates to ${
            flow === 'sourcing' ? 'apply' : 'take interviews'
          }
          for this job role`}
        </Stack>
      </Collapse>
      <Collapse in={!isStart}>
        <Stack gap={2}>
          <Stack style={{ color: 'grey' }}>
            {` Pick date and time and aglint will start ${flow} automatically on
            that time`}
          </Stack>
          <SpecializedDatePicker
            value={dayjs(date).isValid() ? dayjs(date) : null}
            label='Scheduled date'
            onChange={(e) => {
              setDate(e ? e.format('YYYY-MM-DD') : null);
            }}
          />
          {/* <SpecializedTimePicker
            label={'Scheduled time'}
            value={dayjs(time).isValid() ? dayjs(time) : null}
            onChange={(e) => {
              setTime(
                e
                  ? `2000-01-01T${e.format('YYYY-MM-DDTHH:mm').split('T')[1]}`
                  : null,
              );
            }}
          /> */}
        </Stack>
      </Collapse>
    </>
  );
};

export default JobApplicationStatus;
