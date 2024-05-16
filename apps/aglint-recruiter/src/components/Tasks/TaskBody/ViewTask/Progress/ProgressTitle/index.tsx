import { task_title_metaDataType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import AssigneeChip from '@/src/components/Tasks/Components/AssigneeChip';
import StatusChip from '@/src/components/Tasks/Components/StatusChip';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';

import PriorityList from '../../../AddNewTask/PriorityList';

function ProgressTitle({
  title,
  titleMetaData,
  selectedTask,
}: {
  title: string;
  titleMetaData: task_title_metaDataType;
  selectedTask: TasksAgentContextType['tasks'][number];
}) {
  const candidateDetails = selectedTask?.applications?.candidates;

  const currentTimeZone = dayjs.tz.guess();

  const bookingDate = titleMetaData['{date_format}']
    ? `<b>${dayjs(titleMetaData['{date_format}'])
        .tz(candidateDetails?.timezone || currentTimeZone)
        .format(
          'MMM DD',
        )} (${candidateDetails?.timezone || currentTimeZone})</b>`
    : '';
  const bookingTime = titleMetaData['{time_format}']
    ? `<b>${dayjs(titleMetaData['{time_format}'])
        .tz(candidateDetails?.timezone || currentTimeZone)
        .format(
          'MMM DD, hh:mm A',
        )} (${candidateDetails?.timezone || currentTimeZone})</b>`
    : '';

  const location = titleMetaData['{location}'];
  const errorMessage = titleMetaData['{err_msg}'];
  const prevScheduleDateRange = `${dayjs(
    titleMetaData['{prevScheduleDateRange}']?.start_date,
  ).format('MMM DD')} ${
    titleMetaData['{prevScheduleDateRange}']?.end_date
      ? ' - ' +
        dayjs(titleMetaData['{prevScheduleDateRange}']?.end_date).format(
          'MMM DD',
        )
      : ''
  }`;
  const scheduleDateRange = `${dayjs(
    titleMetaData['{scheduleDateRange}']?.start_date,
  ).format('MMM DD')} ${
    titleMetaData['{scheduleDateRange}']?.end_date
      ? ' - ' +
        dayjs(titleMetaData['{scheduleDateRange}']?.end_date).format('MMM DD')
      : ''
  }`;
  const previousTriggerTime = dayjs(
    titleMetaData['{previousTriggerTime}'],
  ).format('MMM DD, hh:mm A');
  const currentTriggerTime = dayjs(
    titleMetaData['{previousTriggerTime}'],
  ).format('MMM DD, hh:mm A');
  const scheduleDateRangeNotFound = `${dayjs(
    titleMetaData['{scheduleDateRangeNotFound}']?.start_date,
  ).format('MMM DD')} ${
    titleMetaData['{scheduleDateRangeNotFound}']?.end_date
      ? ' - ' +
        dayjs(titleMetaData['{scheduleDateRangeNotFound}']?.end_date).format(
          'MMM DD',
        )
      : ''
  }`;
  return (
    <Stack
      flexWrap={'wrap'}
      alignItems={'center'}
      gap={'5px'}
      direction={'row'}
    >
      {String(title)
        .replaceAll('Pm', 'PM')
        .split(' ')
        .map((word, wordIndex: number) => {
          switch (word) {
            case '{time_format}':
              return <span>{bookingTime}</span>;
            case '{date_format}':
              return <span>{bookingDate}</span>;
            case '{err_msg}':
              return errorMessage;
            case '{location}':
              return location;
            //
            case '{candidate}':
              return <b>{titleMetaData['{candidate}']}</b>;
            case '{selectedSessions}':
              return (
                <SelectedSessionList
                  sessions={titleMetaData['{selectedSessions}']}
                />
              );
            case '{currentAssigneeName}':
              return (
                <AssigneeChip
                  assigneeId={titleMetaData['{currentAssigneeId}']}
                  isOnlyName={true}
                />
              );

            case '{assigneeName}':
              return (
                <AssigneeChip
                  assigneeId={titleMetaData['{assigneeId}']}
                  isOnlyName={true}
                />
              );
            case '{prevScheduleDateRange}':
              return (
                <span className='progress_date_section'>
                  {prevScheduleDateRange}
                </span>
              );
            case '{scheduleDateRange}':
              return (
                <span className='progress_date_section'>
                  {scheduleDateRange}
                </span>
              );
            case '{currentTriggerTime}':
              return (
                <span className='progress_date_section'>
                  {currentTriggerTime}
                </span>
              );
            case '{previousTriggerTime}':
              return (
                <span className='progress_date_section'>
                  {previousTriggerTime}
                </span>
              );
            case '{scheduleDateRangeNotFound}':
              return (
                <span className='progress_date_section'>
                  {scheduleDateRangeNotFound}
                </span>
              );
            case '{status}':
              return <StatusChip status={titleMetaData['{status}']} />;
            case '{currentStatus}':
              return <StatusChip status={titleMetaData['{currentStatus}']} />;
            case '{dueDateRage}':
              return (
                <DueDateRange dueDateRange={titleMetaData['{dueDateRage}']} />
              );
            case '{currentPriority}':
              return (
                <Stack key={wordIndex}>
                  <PriorityList
                    isOptionList={false}
                    selectedPriority={titleMetaData['{currentPriority}']}
                  />
                </Stack>
              );
            case '{priority}':
              return (
                <Stack key={wordIndex}>
                  <PriorityList
                    isOptionList={false}
                    selectedPriority={titleMetaData['{priority}']}
                  />
                </Stack>
              );
            case '{addedSessions}':
              return (
                <b>
                  {titleMetaData['{addedSessions}']
                    .map((ele) => ele.name)
                    .join(', ')}
                </b>
              );
            case '{removedSessions}':
              return (
                <b>
                  {titleMetaData['{removedSessions}']
                    .map((ele) => ele.name)
                    .join(', ')}
                </b>
              );

            default:
              return <span key={wordIndex}>{word}</span>;
          }
        })}
    </Stack>
  );
}

export default ProgressTitle;

const DueDateRange = ({
  dueDateRange,
}: {
  dueDateRange: {
    prev: string;
    selectedDate: string;
  };
}) => {
  return (
    <>
      <span className='progress_date_section'>
        {dayjs(dueDateRange.prev).format('MMM DD, hh:mm A')}
      </span>{' '}
      to{' '}
      <span className='progress_date_section'>
        {dayjs(dueDateRange.selectedDate).format('MMM DD, hh:mm A')}
      </span>
    </>
  );
};

const SelectedSessionList = ({
  sessions,
}: {
  sessions: { name: string }[];
}) => {
  return <b>{sessions.map((ele: { name: any }) => ele.name).join(', ')}</b>;
};
