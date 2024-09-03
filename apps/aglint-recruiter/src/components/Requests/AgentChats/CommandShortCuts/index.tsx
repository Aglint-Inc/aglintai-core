import { Calendar, SendHorizontal } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import KeyboardShortcut from '@/src/components/Common/KeyboardShortcut';

import { useAgentIEditor } from '../AgentEditorContext';
import { scheduleTypes } from '../AgentInputBox/utils';

interface ScheduleOptionProps {
  prefix: string;
  command: string;
  suffix: string;
  onClick: () => void;
}

const ScheduleOption: React.FC<ScheduleOptionProps> = ({
  prefix,
  command,
  suffix,
  onClick,
}) => {
  const commandKeys = command.split(' '); // Split command into an array of keys
  return (
    <Button
      variant='outline'
      className='w-full justify-between group'
      onClick={onClick}
    >
      <div className='flex items-center py-2 space-x-2'>
        <Calendar className='h-4 w-4 text-muted-foreground' />
        <span className='text-xs flex items-center'>
          {prefix}
          <KeyboardShortcut keys={commandKeys} /> {/* Pass the array of keys */}
          {suffix}
        </span>
      </div>
      <SendHorizontal className='h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
    </Button>
  );
};

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
      command: 'Ctrl 1',
      suffix: '@Candidate',
    },
  ];

  const { setText, inputRef, text } = useAgentIEditor();
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
        case 'Ctrl 1':
          taskType = `schedule_type[${scheduleTypes[0]?.id}]:[${scheduleTypes[0]?.display}] @`;
          break;
        case 'ctrl + 2':
          taskType = `schedule_type[${scheduleTypes[1]?.id}]:[${scheduleTypes[1]?.display}] /`;
          break;
        case 'ctrl + 3':
          taskType = `schedule_type[${scheduleTypes[2]?.id}]:[${scheduleTypes[2]?.display}] /`;
          break;
        default:
          break;
      }
      if (taskType) {
        const regex = /schedule_type\[[^\]]+\]:\[[^\]]+\] ?/;

        if (regex.test(text)) {
          setText(text.replace(regex, taskType));
        } else {
          setText(`${taskType}${text}`);
        }
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  };

  return (
    <>
      {commandOptions.map(({ command, prefix, suffix }, i) => {
        return (
          <ScheduleOption
            key={i}
            prefix={prefix}
            command={command}
            suffix={suffix}
            onClick={() => handleClick(command)}
          />
        );
      })}
    </>
  );
}

export default CommandShortCuts;
