/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './EditorStyle.css'; // We will define some styles here

import { Clock, Info } from 'lucide-react';
import React, { type Dispatch, type SetStateAction, useState } from 'react';
//@ts-ignore
import { Mention, MentionsInput } from 'react-mentions'; // install the mentions library

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { ShowCode } from '@/components/Common/ShowCode';

import ScrollingText from '../../Components/ScrollingText';
import { type ScheduleType, type selectedItemsType } from '../utils';
import {
  type MentionComponentProps,
  type MentionInputProps,
  type MentionType,
} from './utils';

interface AgentEditorProps {
  applicationsList?: { id: string; display: string }[];
  jobList?: { id: string; display: string }[];
  scheduleTypes?: { id: ScheduleType; display: string }[];
  sessionList?: { id: string; display: string }[];
  requestList?: { id: string; display: string }[];

  handleTextChange?: ({
    newValue,
    newPlainTextValue,
  }: {
    newValue: string;
    newPlainTextValue: string;
  }) => void;
  handleSubmit?: ({
    planText,
    markupText,
  }: {
    planText: string;
    markupText: string;
  }) => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const AgentEditor: React.FC<AgentEditorProps> = ({
  applicationsList = [],
  jobList = [],
  scheduleTypes = [],
  sessionList = [],
  requestList = [],
  handleTextChange,
  handleSubmit,
  text = '',
  setText,
  inputRef,
}: {
  applicationsList?: { id: string; display: string }[];
  jobList?: { id: string; display: string }[];
  scheduleTypes?: { id: ScheduleType; display: string }[];
  sessionList?: { id: string; display: string }[];
  requestList?: { id: string; display: string }[];
  handleTextChange?: ({
    newValue,
    newPlainTextValue,
  }: {
    newValue: string;
    newPlainTextValue: string;
  }) => void;
  handleSubmit?: ({
    planText,
    markupText,
  }: {
    planText: string;
    markupText: string;
  }) => void;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  inputRef?: React.RefObject<HTMLInputElement>;
}) => {
  const [inputText, setInputText] = useState<{
    planText: string;
    mentions: MentionType[];
  }>({ planText: '', mentions: [] });
  const [triggerType, setTriggerType] = useState<
    '@' | '#' | '$' | '%' | '/' | null
  >(null);

  const [selectedItems, setSelectedItems] = useState<selectedItemsType | null>(
    null,
  );

  const filteredSessions = sessionList.filter(
    (session) => !inputText.mentions.map((m) => m.id).includes(session.id),
  );
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey) {
        // Ctrl + Enter adds a new line
        event.preventDefault();
        setText(text + '\n');
      } else {
        // Enter key submits the form
        event.preventDefault();
        handleSubmit &&
          handleSubmit({
            planText: inputText?.planText || '',
            markupText: text,
          });
      }
    }

    if (
      event.key === '@' ||
      event.key === '#' ||
      event.key === '$' ||
      event.key === '%' ||
      event.key === '/'
    ) {
      setTriggerType(event.key);
    }

    if (event.ctrlKey) {
      let taskType = '';
      switch (event.key) {
        case '1':
          taskType = `schedule_type[${scheduleTypes[0]?.id}]:[${scheduleTypes[0]?.display}] @`;
          setTriggerType('@');
          break;
        case '2':
          taskType = `schedule_type[${scheduleTypes[1]?.id}]:[${scheduleTypes[1]?.display}] /`;
          setTriggerType('/');
          break;
        case '3':
          taskType = `schedule_type[${scheduleTypes[2]?.id}]:[${scheduleTypes[2]?.display}] /`;
          setTriggerType('/');
          break;
        default:
          break;
      }

      if (taskType) {
        const regex = /schedule_type\[[^\]]+\]:\[[^\]]+\] ?/;
        const newTaskDisplay =
          event.key === '1'
            ? scheduleTypes[0]?.display
            : event.key === '2'
              ? scheduleTypes[1]?.display
              : event.key === '3'
                ? scheduleTypes[2]?.display
                : '';

        if (regex.test(text) && handleTextChange) {
          setText(text.replace(regex, taskType));
          handleTextChange({
            newPlainTextValue: `${newTaskDisplay} ${inputText?.planText || ''}`,
            newValue: text.replace(regex, taskType),
          });
        } else {
          setText(`${taskType}${text}`);
          handleTextChange &&
            handleTextChange({
              newPlainTextValue: `${newTaskDisplay} ${inputText?.planText || ''}`,
              newValue: `${taskType}${text}`,
            });
        }
      }
    }
  };

  const handleAddMention = (_props: MentionType, trigger: string) => {
    switch (trigger) {
      case '%':
        setTimeout(() => {
          setText((prev) => prev + '#');
          setTriggerType('#');
        }, 100);
        break;
      case '#':
        setTimeout(() => {
          setText((prev) => prev + '@');
          setTriggerType('@');
        }, 10);
        break;
      case '@':
        setTimeout(() => {
          setText((prev) => prev + '$');
          setTriggerType('$');
        }, 10);
        break;
      case '$':
        setTimeout(() => {
          setTriggerType('$');
        }, 10);
        break;
      default:
        break;
    }
  };
  const mentionsInputProps: MentionInputProps = {
    inputRef,
    // onFocus: () => {
    //   if (!text) {
    //     setTriggerType('/');
    //     setText('/');
    //     setTimeout(() => {
    //       inputRef.current?.focus();
    //     }, 10);
    //   }
    // },

    placeholder: "Type '#' for jobs or '@' for candidates or '/' for requests",
    style: {
      control: {
        backgroundColor: '#fff',
        fontSize: 14,
        width: '384px',
        lineHeight: '20px',
        padding: '10px 10px 40px',
      },
      highlighter: {
        overflow: 'hidden',
        margin: '0px 0px 0px -5px',
        padding: '1px',
      },
      input: {
        margin: 0,
        border: '1px solid border-neutral-300',
        borderBottom: 'none',
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
    onChange: (e, newValue, newPlainTextValue, mentions) => {
      function extractIdsAndNames(input: string) {
        const regex = /(\w+)\[([^[\]]+)\]:\[([^[\]]+)\]/g;
        let match;
        const result = {
          schedule_type: [],
          job_title: [],
          applicant_name: [],
          interview_name: [],
          request_name: [],
        };

        while ((match = regex.exec(input)) !== null) {
          // @ts-ignore
          result[match[1]].push({ id: match[2], name: match[3] });
        }

        return result;
      }

      const items = extractIdsAndNames(newValue);

      setSelectedItems(items);
      setInputText({
        planText: newPlainTextValue,
        mentions: mentions.map((mention) => ({
          id: mention.id,
          display: mention.display,
        })),
      });
      setText(newValue);
      handleTextChange &&
        handleTextChange({
          newValue,
          newPlainTextValue,
        });
    },
    customSuggestionsContainer: (children) => (
      <div>
        <div className='rounded-md border bg-white shadow-sm'>
          <div className='flex justify-between p-3'>
            <div className='mb-2 text-sm text-gray-700'>
              {`Type or choose ${triggerType === '#' ? 'job' : triggerType === '@' ? 'candidate' : triggerType === '/' ? 'request' : triggerType === '$' ? 'sessions' : 'schedule type'} from the list`}
            </div>
            <div className='mb-2 flex items-center space-x-2'>
              <kbd className='rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800'>
                ↑
              </kbd>
              <kbd className='rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800'>
                ↓
              </kbd>
            </div>
          </div>

          <div
            id='listContainer'
            className='max-h-48 overflow-y-auto overflow-x-hidden p-3 pt-0'
          >
            <ShowCode>
              <ShowCode
                isTrue={triggerType === '$' && filteredSessions.length === 0}
              >
                {selectedItems?.applicant_name[0]?.name ? (
                  <>
                    <GlobalEmpty
                      icon={<Clock strokeWidth={1} className='h-10 w-10' />}
                      header={`There are no session found for ${selectedItems?.applicant_name[0]?.name}`}
                    />
                  </>
                ) : (
                  <GlobalEmpty
                    icon={<Info strokeWidth={1} className='h-10 w-10' />}
                    header={`Please select an application first`}
                  />
                )}
              </ShowCode>
              <ShowCode.When
                isTrue={
                  (triggerType === '@' && applicationsList.length === 0) ||
                  (triggerType === '#' && jobList.length === 0) ||
                  (triggerType === '/' && requestList.length === 0)
                }
              >
                <GlobalEmpty
                  icon={<Info strokeWidth={1} className='h-10 w-10' />}
                  header={`Results not found`}
                />
              </ShowCode.When>
            </ShowCode>
            {children}
          </div>
        </div>
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
    style: {
      backgroundColor,
      color: '#00000000',
      borderRadius: '5px',
      border: '1px solid border-neutral-300',
    },
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
    scheduleTypes.filter(
      (session) => !inputText.mentions.map((m) => m.id).includes(session.id),
    ),
    'bg-purple-700',
    'schedule_type[__id__]:[__display__]',
  );

  const mentionJobList = createMentionComponent(
    '#',
    jobList.filter(
      (session) => !inputText.mentions.map((m) => m.id).includes(session.id),
    ),
    'bg-yellow-100',
    'job_title[__id__]:[__display__]',
  );
  const mentionApplicationsList = createMentionComponent(
    '@',
    applicationsList.filter(
      (session) => !inputText.mentions.map((m) => m.id).includes(session.id),
    ),
    'bg-sky-100',
    'applicant_name[__id__]:[__display__]',
  );
  const mentionSessionList = createMentionComponent(
    '$',
    filteredSessions,
    'bg-neutral-200',
    'interview_name[__id__]:[__display__]',
  );
  const mentionRequestList = createMentionComponent(
    '/',
    requestList.filter(
      (session) => !inputText.mentions.map((m) => m.id).includes(session.id),
    ),
    'bg-pink-100',
    'request_name[__id__]:[__display__]',
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
      <div className='relative -top-[10px] flex h-[28px] w-full flex-row items-center justify-center rounded-b-[10px] border border-t-0 border-neutral-300 bg-neutral-50'>
        <ScrollingText />
      </div>
    </div>
  );
};

export default AgentEditor;

const Suggestion = ({
  entry,
  highlightedDisplay,
  focused,
  index,
  search: _search,
}: {
  entry: MentionType;
  highlightedDisplay: React.ReactNode;
  focused: boolean;
  index: number;
  search: string;
}) => {
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
