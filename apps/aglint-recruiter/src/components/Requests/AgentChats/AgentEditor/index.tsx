/* eslint-disable no-unused-vars */
import './EditorStyle.css'; // We will define some styles here

import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import {
  MentionComponentProps,
  MentionInputProps,
  MentionType,
  ScheduleType,
} from './utils';

function AgentEditor({
  isFetchedApplications,
  isFetchedSessions,
  applicationsList,
  jobList,
  scheduleTypes,
  sessionList,
  getSelectedScheduleType,
  getSelectedJob,
  getSelectedApplication,
  getSelectedSession,
  handleTextChange,
  handleSubmit,
}: {
  isFetchedApplications?: boolean;
  isFetchedSessions?: boolean;
  applicationsList?: { id: string; display: string }[];
  jobList?: { id: string; display: string }[];
  scheduleTypes?: { id: string; display: ScheduleType }[];
  sessionList?: { id: string; display: string }[];
  getSelectedJob?: ({ id, display }: { id: string; display: string }) => void;
  getSelectedApplication?: ({ id, display }: MentionType) => void;
  getSelectedScheduleType?: ({ id, display }: MentionType) => void;
  getSelectedSession?: ({ id, display }: MentionType) => void;
  handleTextChange?: (x: string) => void;
  handleSubmit?: (x: string) => void;
}) {
  const [text, setText] = useState('');
  const [triggerType, setTriggerType] = useState<'@' | '#' | '$' | '%'>(null);
  console.log(isFetchedSessions);
  const mentionsInputProps: MentionInputProps = {
    a11ySuggestionsListLabel: 'Suggestions',
    placeholder: "Type '@' for candidates or '#' for jobs",
    style: {
      control: {
        backgroundColor: '#fff',
        fontSize: 16,
        width: '484px',
        lineHeight: '20px',
        padding: '10px',
      },
      highlighter: {
        overflow: 'hidden',
        margin: '0px 0px 0px -5px',
      },

      input: {
        margin: 0,
        border: '1px solid #E9EBED',
        borderRadius: '10px',
        outline: 'none',
        // height: '100%',
        // padding: '0px 15px',
        padding: '10px',
        maxHeight: '400px',
        // cursor: isFetchedSessions ? 'progress' : 'text',
      },
      suggestions: {
        marginTop: '23px', // Adjust this value to move the suggestion list down
        border: '#E9EBED 1px solid',
        borderRadius: '10px 10px 0px 0px',
        borderTop: 'none',
        width: '484px',
        backgroundColor: '#F9F9F8',
        maxHeight: '200px',
        overflowY: 'hidden',
        overflowX: 'hidden',
      },
    },
    value: text,
    onChange: (e, newValue) => {
      setText(newValue);
      handleTextChange(newValue);
    },
    customSuggestionsContainer: (children) => {
      return (
        <div
          className='mentions__control'
          style={{
            width: '800px',
            padding: '5px',
            border: 'none',
            borderTop: 'none',
          }}
        >
          {(sessionList.length && triggerType === '%') ||
          (applicationsList.length && triggerType === '@') ||
          (jobList.length && triggerType === '#') ||
          (scheduleTypes.length && triggerType === '$') ? (
            <Instructions
              heading={
                triggerType === '$'
                  ? 'schedule_type'
                  : triggerType === '#'
                    ? 'jobs'
                    : triggerType === '@'
                      ? 'candidates'
                      : triggerType === '%'
                        ? 'sessions'
                        : null
              }
            />
          ) : (
            <>Not fround</>
          )}
          <div
            id='listContainer'
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
            // className='mentions__suggestions'
          >
            {children}
          </div>
        </div>
      );
    },
    singleLine: false,
    forceSuggestionsAboveCursor: true,
    

    onKeyDown: (e) => {
      handleKeyDown(e);
    },
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // on submit
    if (event.ctrlKey && event.key === 'Enter') {
      handleSubmit(text);
    }
    // to show what key was pressed for mention list
    if (
      event.key === '@' ||
      event.key === '#' ||
      event.key === '$' ||
      event.key === '%'
    ) {
      setTriggerType(event.key);
    }
    // shortcut to add scheduleType
    if (event.ctrlKey && event.key === ' ') {
      setText(text + '$');
    }
    if (event.ctrlKey && event.key === '1') {
      setText((pre) => pre + '$' + scheduleTypes[0].display);
    }
    if (event.ctrlKey && event.key === '2') {
      setText((pre) => pre + '$' + scheduleTypes[1].display);
    }
    if (event.ctrlKey && event.key === '3') {
      setText((pre) => pre + '$' + scheduleTypes[2].display);
    }
  };

  const mentionJobList: MentionComponentProps = {
    trigger: '#',
    data: jobList.length > 0 ? jobList : [{ id: '1', display: 'No results' }],
    style: {
      backgroundColor: '#fcf4a3',
      color: '#00000000',
      borderRadius: '5px',
    },
    markup: 'job_title:[__display__]',
    renderSuggestion(entry, search, highlightedDisplay, index, focused) {
      return (
        <div
          style={{ display: entry.display === 'No results' ? 'none' : 'block' }}
          className={
            focused ? 'mentions__suggestion--focused' : 'mentions__suggestion'
          }
        >
          {entry.display}
        </div>
      );
    },
    onAdd(id, display) {
      getSelectedJob({ id, display });
      setTimeout(() => {
        setText((pre) => pre + '@');
        setTriggerType('@');
      }, 10);
    },
    appendSpaceOnAdd: true,
    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + '  ';
    },
  };
  const mentionApplicationsList: MentionComponentProps = {
    trigger: '@',
    data:
      applicationsList.length > 0
        ? applicationsList
        : [{ id: '1', display: 'No results' }],
    style: {
      backgroundColor: '#daf4fa',
      color: '#00000000',
      borderRadius: '5px',
    },
    markup: 'applicant_name:[__display__]',
    renderSuggestion(entry, search, highlightedDisplay, index, focused) {
      return (
        <div
          style={{ display: entry.display === 'No results' ? 'none' : 'block' }}
          className={
            focused ? 'mentions__suggestion--focused' : 'mentions__suggestion'
          }
        >
          {entry.display}
        </div>
      );
    },
    onAdd(id, display) {
      getSelectedApplication({ id, display });
      setTimeout(() => {
        setText((pre) => pre + '%');
        setTriggerType('%');
      }, 1500);
    },
    appendSpaceOnAdd: true,
    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + '  ';
    },
  };
  const mentionScheduleTypes: MentionComponentProps = {
    trigger: '$',
    data:
      scheduleTypes.length > 0
        ? scheduleTypes
        : [{ id: '1', display: 'No results' }],
    style: {
      backgroundColor: '#8E00F112',
      color: '#00000000',
      borderRadius: '5px',
    },
    markup: 'schedule_type:[__display__]',
    renderSuggestion(entry, search, highlightedDisplay, index, focused) {
      return (
        <div
          style={{ display: entry.display === 'No results' ? 'none' : 'block' }}
          className={
            focused ? 'mentions__suggestion--focused' : 'mentions__suggestion'
          }
        >
          {entry.id !== '1' ? entry.display : ''}
        </div>
      );
    },
    onAdd(id, display, startPos, endPos) {
      getSelectedScheduleType({ id, display });
      setTimeout(() => {
        setText((pre) => pre + '#');
        setTriggerType('#');
      }, 100);
    },
    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + ':  ';
    },
    appendSpaceOnAdd: true,
  };
  const mentionSessionList: MentionComponentProps = {
    trigger: '%',
    data:
      sessionList.length > 0
        ? sessionList
        : [{ id: '1', display: 'No results' }],
    style: {
      backgroundColor: '#fcf4a3',
      color: '#00000000',
      borderRadius: '5px',
    },
    markup: 'interview_name:[__display__]',
    renderSuggestion(entry, search, highlightedDisplay, index, focused) {
      return (
        <div
          style={{ display: entry.display === 'No results' ? 'none' : 'block' }}
          className={
            focused ? 'mentions__suggestion--focused' : 'mentions__suggestion'
          }
        >
          {entry.display}
        </div>
      );
    },
    onAdd(id, display) {
      getSelectedSession({ id, display });
    },
    appendSpaceOnAdd: true,
    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + '  ';
    },
  };

  return (
    <>
      <div className='mention-component'>
        <MentionsInput {...mentionsInputProps}>
          <Mention {...mentionScheduleTypes} />
          <Mention {...mentionJobList} />
          <Mention {...mentionApplicationsList} />
          <Mention {...mentionSessionList} />
        </MentionsInput>
      </div>
    </>
  );
}

export default AgentEditor;

const Instructions = ({
  heading,
}: {
  heading: 'jobs' | 'candidates' | 'schedule_type' | 'sessions';
}) => {
  return (
    <Stack
      py={1}
      pr={2}
      direction={'row'}
      width={'480px'}
      justifyContent={'space-between'}
    >
      <Typography variant={'h5'}>
        Select {capitalizeFirstLetter(heading)}
      </Typography>
      <Stack direction={'row'}>
        Use arrow key <GlobalIcon size={5} iconName={'keyboard_arrow_up'} />{' '}
        <GlobalIcon size={5} iconName={'keyboard_arrow_down'} />
      </Stack>
    </Stack>
  );
};
