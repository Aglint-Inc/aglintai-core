'use client';

import { cn } from '@lib/utils';
import { User, WandSparkles } from 'lucide-react';

interface AiCommandProps {
  onClickAiCommand?: React.HTMLAttributes<HTMLDivElement>;
  onClickCandidateName?: React.HTMLAttributes<HTMLDivElement>;
  isAiCommandActive?: boolean;
  isCandidateNameActive?: boolean;
  onClickRecruiterName?: React.HTMLAttributes<HTMLDivElement>;
  isRecruiterActive?: boolean;
  isAiCommandVisible?: boolean;
}

export function AiCommand({
  onClickAiCommand = {},
  onClickCandidateName = {},
  isAiCommandActive = false,
  isCandidateNameActive = false,
  onClickRecruiterName = {},
  isRecruiterActive = false,
  isAiCommandVisible = true,
}: AiCommandProps) {
  return (
    <div className='flex max-w-[177px] flex-col rounded-lg border border-gray-200 bg-white p-2.5 shadow-md'>
      {isAiCommandVisible && (
        <CommandItem
          onClick={onClickAiCommand}
          isActive={isAiCommandActive}
          icon={<WandSparkles />}
          label='AI Command'
        />
      )}
      <CommandItem
        onClick={onClickCandidateName}
        isActive={isCandidateNameActive}
        icon={<User />}
        label='Candidate Name'
      />
      <CommandItem
        onClick={onClickRecruiterName}
        isActive={isRecruiterActive}
        icon={<User />}
        label='Recruiter Name'
      />
    </div>
  );
}

interface CommandItemProps {
  onClick: React.HTMLAttributes<HTMLDivElement>;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

function CommandItem({ onClick, isActive, icon, label }: CommandItemProps) {
  return (
    <div className='relative overflow-hidden rounded'>
      <div
        className={cn(
          'duration-250 relative z-10 flex cursor-pointer items-center gap-2.5 rounded p-3 transition-colors hover:bg-gray-50',
          onClick,
        )}
      >
        {icon}
        <div className='text-kale-600'>{label}</div>
      </div>
      {isActive && <div className='absolute inset-0 bg-gray-50' />}
    </div>
  );
}
