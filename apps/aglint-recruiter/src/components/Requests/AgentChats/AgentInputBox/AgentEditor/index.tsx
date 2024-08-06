/* eslint-disable no-unused-vars */
import './EditorStyle.css'; // We will define some styles here

import { Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AiChatSuggest } from '@/devlink2/AiChatSuggest';
import { Text } from '@/devlink2/Text';
import { Kbd } from '@/devlink3/Kbd';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { ScheduleType } from '../utils';
import { MentionComponentProps, MentionInputProps, MentionType } from './utils';

interface AgentEditorProps {
  applicationsList?: { id: string; display: string }[];
  jobList?: { id: string; display: string }[];
  scheduleTypes?: { id: string; display: ScheduleType }[];
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
}) => {
  const [inputText, setInputText] = useState<{
    planText: string;
    mentions: MentionType[];
  }>(null);
  const [triggerType, setTriggerType] = useState<
    '@' | '#' | '$' | '%' | '!' | null
  >(null);

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
      event.key === '!'
    ) {
      setTriggerType(event.key);
    }

    if (event.ctrlKey) {
      let taskType = '';
      switch (event.key) {
        case '1':
          taskType = `schedule_type[${scheduleTypes[0]?.id}]:[${scheduleTypes[0]?.display}] @`;
          break;
        case '2':
          taskType = `schedule_type[${scheduleTypes[1]?.id}]:[${scheduleTypes[1]?.display}] !`;
          break;
        case '3':
          taskType = `schedule_type[${scheduleTypes[2]?.id}]:[${scheduleTypes[2]?.display}] !`;
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

        if (regex.test(text)) {
          setText(text.replace(regex, taskType));
          handleTextChange({
            newPlainTextValue: `${newTaskDisplay} ${inputText?.planText || ''}`,
            newValue: text.replace(regex, taskType),
          });
        } else {
          setText(`${taskType}${text}`);
          handleTextChange({
            newPlainTextValue: `${newTaskDisplay} ${inputText?.planText || ''}`,
            newValue: `${taskType}${text}`,
          });
        }
      }
    }
  };

  const handleAddMention = ({ id, display }: MentionType, trigger: string) => {
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
          setText((prev) => prev + '$');
          setTriggerType('$');
        }, 10);
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
          inputRef.current?.focus();
        }, 10);
      }
    },

    placeholder: "Type '#' for jobs or '@' for candidates or '!' for requests",
    style: {
      control: {
        backgroundColor: '#fff',
        fontSize: 16,
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
        border: '1px solid var(--neutral-6)',
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
    style: {
      backgroundColor,
      color: '#00000000',
      borderRadius: '5px',
      border: '1px solid #F1F0EF',
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
    scheduleTypes,
    '#8E00F112',
    'schedule_type[__id__]:[__display__]',
  );

  const mentionJobList = createMentionComponent(
    '#',
    jobList,
    '#fcf4a3',
    'job_title[__id__]:[__display__]',
  );
  const mentionApplicationsList = createMentionComponent(
    '@',
    applicationsList,
    '#daf4fa',
    'applicant_name[__id__]:[__display__]',
  );
  const mentionSessionList = createMentionComponent(
    '$',
    sessionList,
    '#F1F0EF',
    'interview_name[__id__]:[__display__]',
  );
  const mentionRequestList = createMentionComponent(
    '!',
    requestList,
    '#fcf',
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
      <Stack
        position={'relative'}
        top={'-10px'}
        sx={{
          border: '1px solid var(--neutral-6)',
          borderTop: 'none',
          borderRadius: '0 0 10px 10px',
        }}
        height={'28px'}
        bgcolor={'#F9F9F8'}
        width={'100%'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          align={'center'}
          color={'neutral'}
          size={1}
          content={'Powered by Aglint. Simplifying your scheduling with AI.'}
        />
      </Stack>
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
