/* eslint-disable no-unused-vars */
import './EditorStyle.css'; // We will define some styles here

import React, { useRef, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AiChatSuggest } from '@/devlink2/AiChatSuggest';
import { Kbd } from '@/devlink3/Kbd';
import { ShowCode } from '@/src/components/Common/ShowCode';

import {
  MentionComponentProps,
  MentionInputProps,
  MentionType,
  ScheduleType,
} from './utils';

interface AgentEditorProps {
  applicationsList?: { id: string; display: string }[];
  jobList?: { id: string; display: string }[];
  scheduleTypes?: { id: string; display: ScheduleType }[];
  sessionList?: { id: string; display: string }[];
  requestList?: { id: string; display: string }[];
  getSelectedScheduleType?: ({ id, display }: MentionType) => void;
  getSelectedJob?: ({ id, display }: MentionType) => void;
  getSelectedApplication?: ({ id, display }: MentionType) => void;
  getSelectedRequest?: ({ id, display }: MentionType) => void;
  getSelectedSession?: ({ id, display }: MentionType) => void;
  handleTextChange?: (text: string) => void;
  handleSubmit?: (text: string) => void;
}

const AgentEditor: React.FC<AgentEditorProps> = ({
  applicationsList = [],
  jobList = [],
  scheduleTypes = [],
  sessionList = [],
  requestList = [],
  getSelectedJob,
  getSelectedApplication,
  getSelectedScheduleType,
  getSelectedRequest,
  getSelectedSession,
  handleTextChange,
  handleSubmit,
}) => {
  const [text, setText] = useState('');
  const [triggerType, setTriggerType] = useState<
    '@' | '#' | '$' | '%' | '!' | null
  >(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleSubmit && handleSubmit(text);
    }

    if (
      event.key === '@' ||
      event.key === '#' ||
      event.key === '$' ||
      event.key === '%' ||
      event.key === '!'
    ) {
      setTriggerType(event.key);
    }

    if (event.ctrlKey) {
      let taskType = '';
      switch (event.key) {
        case '1':
          taskType = `schedule_type:[${scheduleTypes[0]?.display}] @`;
          break;
        case '2':
          taskType = `schedule_type:[${scheduleTypes[1]?.display}] !`;
          break;
        case '3':
          taskType = `schedule_type:[${scheduleTypes[2]?.display}] !`;
          break;
        default:
          break;
      }
      if (taskType) {
        const regex = /schedule_type:\[[^\]]*\] ?/;
        if (regex.test(text)) {
          setText(text.replace(regex, taskType));
        } else {
          setText(`${taskType}${text}`);
        }
      }
    }
  };

  const handleAddMention = ({ id, display }: MentionType, trigger: string) => {
    switch (trigger) {
      case '!':
        getSelectedRequest && getSelectedRequest({ id, display });
        break;
      case '%':
        getSelectedScheduleType && getSelectedScheduleType({ id, display });
        setTimeout(() => {
          setText((prev) => prev + '#');
          setTriggerType('#');
        }, 100);
        break;
      case '#':
        getSelectedJob && getSelectedJob({ id, display });
        setTimeout(() => {
          setText((prev) => prev + '@');
          setTriggerType('@');
        }, 10);
        break;
      case '@':
        getSelectedApplication && getSelectedApplication({ id, display });
        setTimeout(() => {
          setText((prev) => prev + '$');
          setTriggerType('$');
        }, 10);
        break;
      case '$':
        getSelectedSession && getSelectedSession({ id, display });
        break;
      default:
        break;
    }
  };

  const mentionsInputProps: MentionInputProps = {
    inputRef,
    onFocus: () => {
      if (!text) {
        setTriggerType('!');
        setText('!');
        setTimeout(() => {
          inputRef.current?.setSelectionRange(7, 7);
          inputRef.current?.focus();
        }, 10);
      }
    },
    onBlur: () => {
      if (!text.trim()) {
        setText('');
      }
    },
    placeholder: "Type '#' for jobs or '@' for candidates or '!' for requests",
    style: {
      control: {
        backgroundColor: '#fff',
        fontSize: 16,
        width: '384px',
        lineHeight: '20px',
        padding: '10px 10px 48px',
      },
      highlighter: {
        overflow: 'hidden',
        margin: '0px 0px 0px -5px',
        padding: '1px',
      },
      input: {
        margin: 0,
        border: '1px solid var(--neutral-6)',
        borderRadius: '10px',
        outline: 'none',
        padding: '10px',
        maxHeight: '400px',
      },
      suggestions: {
        marginTop: '10px',
        borderTop: 'none',
        width: '384px',
        backgroundColor: '#F9F9F8',
      },
    },
    value: text,
    onChange: (e, newValue) => {
      setText(newValue);
      handleTextChange && handleTextChange(newValue);
    },
    customSuggestionsContainer: (children) => (
      <div>
        <AiChatSuggest
          textHeader='Type or choose jobs from the list'
          slotKbd={
            <>
              <Kbd
                textShortcut={<GlobalIcon size={2} iconName='arrow_upward' />}
              />
              <Kbd
                textShortcut={<GlobalIcon size={2} iconName='arrow_downward' />}
              />
            </>
          }
          slotList={
            <div
              id='listContainer'
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <ShowCode>
                <ShowCode.When
                  isTrue={
                    (triggerType === '@' && applicationsList.length === 0) ||
                    (triggerType === '#' && jobList.length === 0) ||
                    (triggerType === '$' && sessionList.length === 0) ||
                    (triggerType === '!' && requestList.length === 0)
                  }
                >
                  <>No results</>
                </ShowCode.When>
              </ShowCode>
              {children}
            </div>
          }
        />
      </div>
    ),
    singleLine: false,
    forceSuggestionsAboveCursor: true,
    allowSuggestionsAboveCursor: true,
    onKeyDown: handleKeyDown,
  };

  const createMentionComponent = (
    trigger: string,
    data: { id: string; display: string }[],
    backgroundColor: string,
    markup: string,
  ): MentionComponentProps => ({
    trigger,
    data: data.length > 0 ? data : [{ id: '1', display: 'No results' }],
    style: { backgroundColor, color: '#00000000', borderRadius: '5px', border:'1px solid #F1F0EF' },
    markup,
    renderSuggestion: (entry, search, highlightedDisplay, index, focused) => (
      <Suggestion
        key={index}
        index={index}
        entry={entry}
        highlightedDisplay={highlightedDisplay}
        focused={focused}
        search={search}
      />
    ),
    onAdd: (id, display) => handleAddMention({ id, display }, trigger),
    appendSpaceOnAdd: true,
    displayTransform: (id, display) =>
      display === 'No results' ? '' : display + '  ',
  });

  const mentionScheduleTypes = createMentionComponent(
    '%',
    scheduleTypes,
    '#8E00F112',
    'schedule_type:[__display__]',
  );

  const mentionJobList = createMentionComponent(
    '#',
    jobList,
    '#fcf4a3',
    'job_title:[__display__]',
  );
  const mentionApplicationsList = createMentionComponent(
    '@',
    applicationsList,
    '#daf4fa',
    'applicant_name:[__display__]',
  );
  const mentionSessionList = createMentionComponent(
    '$',
    sessionList,
    '#F1F0EF',
    'interview_name:[__display__]',
  );
  const mentionRequestList = createMentionComponent(
    '!',
    requestList,
    '#fcf',
    'request_name:[__display__]',
  );

  return (
    <div className='mention-component'>
      <MentionsInput {...mentionsInputProps}>
        <Mention {...mentionScheduleTypes} />
        <Mention {...mentionJobList} />
        <Mention {...mentionApplicationsList} />
        <Mention {...mentionSessionList} />
        <Mention {...mentionRequestList} />
      </MentionsInput>
    </div>
  );
};

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
