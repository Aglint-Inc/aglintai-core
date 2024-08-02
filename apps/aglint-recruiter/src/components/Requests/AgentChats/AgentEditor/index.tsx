/* eslint-disable no-unused-vars */
import './EditorStyle.css'; // We will define some styles here

import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Mention, MentionDataItem, MentionsInput } from 'react-mentions';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import {
  MentionComponentProps,
  MentionInputProps,
  MentionType,
  ScheduleType,
} from './utils';

function AgentEditor({
  applicationsList,
  jobList,
  scheduleTypes,
  sessionList,
  requestList,
  getSelectedScheduleType,
  getSelectedJob,
  getSelectedApplication,
  getSelectedRequest,
  getSelectedSession,
  handleTextChange,
  handleSubmit,
}: {
  applicationsList?: { id: string; display: string }[];
  jobList?: { id: string; display: string }[];
  scheduleTypes?: { id: string; display: ScheduleType }[];
  sessionList?: { id: string; display: string }[];
  requestList?: { id: string; display: string }[];
  getSelectedJob?: ({ id, display }: { id: string; display: string }) => void;
  getSelectedApplication?: ({ id, display }: MentionType) => void;
  getSelectedScheduleType?: ({ id, display }: MentionType) => void;
  getSelectedRequest?: ({ id, display }: MentionType) => void;
  getSelectedSession?: ({ id, display }: MentionType) => void;
  handleTextChange?: (x: string) => void;
  handleSubmit?: (x: string) => void;
}) {
  const [text, setText] = useState('');
  const [triggerType, setTriggerType] = useState<'@' | '#' | '$' | '%' | ''>(
    null,
  );
  const mentionsInputProps: MentionInputProps = {
    onFocus: (e) => {
      setTriggerType('');
      if (!text) {
        setText(' ');
      }
    },
    onBlur: () => {
      if (!text.trim()) {
        setText('');
      }
    },
    // a11ySuggestionsListLabel: 'Suggestions',
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
        maxHeight: '250px',
      },
    },
    value: text,
    onChange: (e, newValue) => {
      setText(newValue);
      handleTextChange(newValue);
    },
    customSuggestionsContainer: (children) => {
      return (
        <div className='mentions__control'>
          {(sessionList.length && triggerType === '%') ||
          (applicationsList.length && triggerType === '@') ||
          (jobList.length && triggerType === '#') ||
          (scheduleTypes.length && triggerType === '$') ||
          requestList.length ? (
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
                        : requestList.length
                          ? 'requests'
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
    allowSuggestionsAboveCursor: true,

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
      event.key === '%' ||
      event.key === ''
    ) {
      setTriggerType(event.key);
    }
    // shortcut to add scheduleType
    if (event.ctrlKey && event.key === ' ') {
      setText(text + '$');
    }
    if (event.ctrlKey && event.key === '1') {
      setText((pre) => scheduleTypes[0].display + pre);
    }
    if (event.ctrlKey && event.key === '2') {
      setText((pre) => scheduleTypes[1].display + pre);
    }
    if (event.ctrlKey && event.key === '3') {
      setText((pre) => scheduleTypes[2].display + pre);
    }
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
    renderSuggestion: (entry, search, highlightedDisplay, index, focused) => {
      return (
        <Suggestion
          index={index}
          entry={entry}
          highlightedDisplay={highlightedDisplay}
          focused={focused}
          search={search}
        />
      );
    },
    onAdd(id, display) {
      handleAddMention({ id, display }, '$');
    },
    appendSpaceOnAdd: true,
    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + ':  ';
    },
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
    renderSuggestion: (entry, search, highlightedDisplay, index, focused) => {
      return (
        <Suggestion
          index={index}
          entry={entry}
          highlightedDisplay={highlightedDisplay}
          focused={focused}
          search={search}
        />
      );
    },
    onAdd(id, display) {
      handleAddMention({ id, display }, '#');
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
    renderSuggestion: (entry, search, highlightedDisplay, index, focused) => {
      return (
        <Suggestion
          index={index}
          entry={entry}
          highlightedDisplay={highlightedDisplay}
          focused={focused}
          search={search}
        />
      );
    },
    onAdd(id, display) {
      handleAddMention({ id, display }, '@');
    },
    appendSpaceOnAdd: true,

    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + '  ';
    },
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
    renderSuggestion: (entry, search, highlightedDisplay, index, focused) => {
      return (
        <Suggestion
          index={index}
          entry={entry}
          highlightedDisplay={highlightedDisplay}
          focused={focused}
          search={search}
        />
      );
    },
    onAdd(id, display) {
      handleAddMention({ id, display }, '%');
    },
    appendSpaceOnAdd: true,

    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + '  ';
    },
  };

  const mentionRequestList: MentionComponentProps = {
    trigger: '23',
    data:
      requestList.length > 0
        ? requestList
        : [{ id: '1', display: 'No results' }],
    style: {
      backgroundColor: '#fcf',
      color: '#00000000',
      borderRadius: '5px',
    },
    markup: 'request_name:[__display__]',
    renderSuggestion: (entry, search, highlightedDisplay, index, focused) => {
      return (
        <Suggestion
          index={index}
          entry={entry}
          highlightedDisplay={highlightedDisplay}
          focused={focused}
          search={search}
        />
      );
    },
    onAdd(id, display) {
      handleAddMention({ id, display }, '%');
    },
    appendSpaceOnAdd: true,

    displayTransform: (id, display) => {
      if (display === 'No results') {
        return '';
      }
      return display + '  ';
    },
  };

  const handleAddMention = ({ id, display }: MentionType, trigger: string) => {
    if (trigger === '') {
      getSelectedRequest({ id, display });
    }
    if (trigger === '$') {
      getSelectedScheduleType({ id, display });
      setTimeout(() => {
        setText((pre) => pre + '#');
        setTriggerType('#');
      }, 100);
    }
    if (trigger === '@') {
      getSelectedApplication({ id, display });
      setTimeout(() => {
        setText((pre) => pre + '%');
        setTriggerType('%');
      }, 10);
    }
    if (trigger === '#') {
      getSelectedJob({ id, display });
      setTimeout(() => {
        setText((pre) => pre + '@');
        setTriggerType('@');
      }, 10);
    }
    if (trigger === '%') {
      getSelectedSession({ id, display });
    }
  };

  return (
    <>
      <div className='mention-component'>
        <MentionsInput {...mentionsInputProps}>
          <Mention {...mentionScheduleTypes} />
          <Mention {...mentionJobList} />
          <Mention {...mentionApplicationsList} />
          <Mention {...mentionSessionList} />
          <Mention {...mentionRequestList} />
        </MentionsInput>
      </div>
    </>
  );
}

export default AgentEditor;

const Suggestion = ({ entry, highlightedDisplay, focused, index, search }) => {
  if (entry.display === 'No results') {
    return null;
  }
  return (
    <div
      key={index}
      className={
        focused ? 'mentions__suggestion--focused' : 'mentions__suggestion'
      }
    >
      {highlightedDisplay}
    </div>
  );
};

const Instructions = ({
  heading,
}: {
  heading: 'jobs' | 'candidates' | 'schedule_type' | 'sessions' | 'requests';
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
