import { Stack } from '@mui/material';
import React from 'react';

import { StartOption } from '@/devlink2/StartOption';
import { Text } from '@/devlink2/Text';

import { scheduleType } from '../AgentEditor/utils';
import { useAgentIEditor } from '../AgentEditorContext';

function CommandShortCuts() {
  const commandOptions = [
    {
      prefix: 'Schedule with',
      command: '@',
      suffix: 'Candidate',
    },
    {
      prefix: 'Schedule with',
      command: '#',
      suffix: 'Job title',
    },
    {
      prefix: 'Schedule with',
      command: 'ctrl + 1',
      suffix: '@Candidate',
    },
    {
      prefix: 'Reschedule with',
      command: 'ctrl + 2',
      suffix: '! request',
    },
    {
      prefix: 'Cancel with',
      command: 'ctrl + 3',
      suffix: '! request',
    },
  ];

  const { setText, inputRef } = useAgentIEditor();
  const handleClick = (commandText: string) => {
    if (commandText) {
      let taskType = '';
      switch (commandText) {
        case '@':
          taskType = `@`;
          break;
        case '#':
          taskType = `#`;
          break;
        case 'ctrl + 1':
          taskType = `schedule_type:[${scheduleType[0]?.display}] @`;
          break;
        case 'ctrl + 2':
          taskType = `schedule_type:[${scheduleType[1]?.display}] !`;
          break;
        case 'ctrl + 3':
          taskType = `schedule_type:[${scheduleType[2]?.display}] !`;
          break;
        default:
          break;
      }
      if (taskType) {
        setText(taskType);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 10);
      }
    }
  };

  return (
    <>
      {commandOptions.map(({ command, prefix, suffix }, i) => {
        return (
          <StartOption
            onClickCard={{
              onClick: () => {
                handleClick(command);
              },
            }}
            key={i}
            slotText={
              <Stack direction={'row'} gap={0.5}>
                <Text size={1} content={prefix} />
                <Text color={'accent'} size={1} content={command} />
                <Text color={'neutral'} size={1} content={suffix} />
              </Stack>
            }
          />
        );
      })}
    </>
  );
}

export default CommandShortCuts;
