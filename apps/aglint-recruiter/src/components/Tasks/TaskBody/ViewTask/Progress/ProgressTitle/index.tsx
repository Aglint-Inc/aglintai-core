import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
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
  titleMetaData: DatabaseTable['new_tasks_progress']['title_meta'];
  selectedTask: TasksAgentContextType['tasks'][number];
}) {
  const candidateDetails = selectedTask?.applications?.candidates;

  const currentTimeZone = dayjs.tz.guess();

  const bookingDate = titleMetaData['{date_format}']
    ? `${dayjs(titleMetaData['{date_format}'])
        .tz(candidateDetails?.timezone || currentTimeZone)
        .format('MMM DD')} (${candidateDetails?.timezone || currentTimeZone})`
    : '';
  const bookingTime = titleMetaData['{time_format}']
    ? `${dayjs(titleMetaData['{time_format}'])
        .tz(candidateDetails?.timezone || currentTimeZone)
        .format(
          'MMM DD, hh:mm A',
        )} (${candidateDetails?.timezone || currentTimeZone})`
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
      ? ' and ' +
        dayjs(titleMetaData['{scheduleDateRange}']?.end_date).format('MMM DD')
      : ''
  }`;
  const previousTriggerTime = dayjs(
    titleMetaData['{previousTriggerTime}'],
  ).format('MMM DD, hh:mm A');
  const currentTriggerTime = dayjs(
    titleMetaData['{currentTriggerTime}'],
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
      gap={'var(--space-1)'}
      direction={'row'}
    >
      {String(title)
        .replaceAll('Pm', 'PM')
        .split(' ')
        .map((word, wordIndex: number) => {
          switch (word) {
            case '{time_format}':
              return (
                <span className='progress_date_section'>{bookingTime}</span>
              );
            case '{date_format}':
              return (
                <span className='progress_date_section'>{bookingDate}</span>
              );
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
            case '{creatorName}':
              return (
                <AssigneeChip
                  assigneeId={titleMetaData['{creatorId}']}
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
                // <span className='progress_date_section'>
                scheduleDateRange
                // </span>
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
            case '{debriefDateRange}':
              return (
                <DebriefDateRange
                  debriefDateRange={titleMetaData['{debriefDateRange}']}
                />
              );
            case '{creatorDesignation}':
              return capitalize(titleMetaData['{creatorDesignation}']);
            default:
              return <span key={wordIndex}>{word}</span>;
          }
        })}
    </Stack>
  );
}

export default ProgressTitle;

function DebriefDateRange({
  debriefDateRange,
}: {
  debriefDateRange: { start_date: string; end_date: string };
}) {
  return (
    <>
      <span className='progress_date_section'>
        {dayjs(debriefDateRange.start_date).format('MMM DD')}
      </span>{' '}
      and{' '}
      <span className='progress_date_section'>
        {dayjs(debriefDateRange.end_date).format('MMM DD')}
      </span>
    </>
  );
}

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
  return <b>{sessions?.map((ele: { name: any }) => ele.name).join(', ')}</b>;
};
