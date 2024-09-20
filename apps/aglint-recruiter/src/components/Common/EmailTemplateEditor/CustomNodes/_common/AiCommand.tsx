'use client';

import { cn } from '@lib/utils';

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
          icon={<AiCommandIcon />}
          label='AI Command'
        />
      )}
      <CommandItem
        onClick={onClickCandidateName}
        isActive={isCandidateNameActive}
        icon={<NameIcon />}
        label='Candidate Name'
      />
      <CommandItem
        onClick={onClickRecruiterName}
        isActive={isRecruiterActive}
        icon={<NameIcon />}
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

function AiCommandIcon() {
  return (
    <svg
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.25 3.15625L12 2.5L12.6562 0.75C12.7188 0.583333 12.8333 0.5 13 0.5C13.1667 0.5 13.2812 0.583333 13.3438 0.75L14 2.5L15.7812 3.15625C15.9271 3.21875 16 3.33333 16 3.5C16 3.66667 15.9271 3.78125 15.7812 3.84375L14 4.5L13.3438 6.28125C13.2812 6.42708 13.1667 6.5 13 6.5C12.8333 6.5 12.7188 6.42708 12.6562 6.28125L12 4.5L10.25 3.84375C10.0833 3.78125 10 3.66667 10 3.5C10 3.33333 10.0833 3.21875 10.25 3.15625ZM6.40625 2.78125L8.0625 6.34375L11.625 8C11.8125 8.10417 11.9062 8.25 11.9062 8.4375C11.9062 8.64583 11.8125 8.80208 11.625 8.90625L8.0625 10.5625L6.40625 14.125C6.30208 14.3125 6.15625 14.4062 5.96875 14.4062C5.76042 14.4062 5.60417 14.3125 5.5 14.125L3.84375 10.5625L0.28125 8.90625C0.09375 8.82292 0 8.67708 0 8.46875C0 8.26042 0.09375 8.10417 0.28125 8L3.84375 6.34375L5.5 2.78125C5.60417 2.59375 5.76042 2.5 5.96875 2.5C6.17708 2.5 6.32292 2.59375 6.40625 2.78125ZM12 12.5L12.6562 10.75C12.7188 10.5833 12.8333 10.5 13 10.5C13.1667 10.5 13.2812 10.5833 13.3438 10.75L14 12.5L15.7812 13.1562C15.9271 13.2188 16 13.3333 16 13.5C16 13.6667 15.9271 13.7812 15.7812 13.8438L14 14.5L13.3438 16.2812C13.2812 16.4271 13.1667 16.5 13 16.5C12.8333 16.5 12.7188 16.4271 12.6562 16.2812L12 14.5L10.25 13.8438C10.0833 13.7812 10 13.6667 10 13.5C10 13.3333 10.0833 13.2188 10.25 13.1562L12 12.5Z'
        fill='#17494D'
      />
    </svg>
  );
}

function NameIcon() {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.25 2.25V3C2.25 3.21875 2.17969 3.39844 2.03906 3.53906C1.89844 3.67969 1.71875 3.75 1.5 3.75C1.28125 3.75 1.10156 3.67969 0.960938 3.53906C0.820312 3.39844 0.75 3.21875 0.75 3V1.875C0.765625 1.5625 0.875 1.29687 1.07812 1.07812C1.29688 0.875 1.5625 0.765625 1.875 0.75H6H10.125C10.4375 0.765625 10.7031 0.875 10.9219 1.07812C11.125 1.29687 11.2344 1.5625 11.25 1.875V3C11.25 3.21875 11.1797 3.39844 11.0391 3.53906C10.8984 3.67969 10.7188 3.75 10.5 3.75C10.2812 3.75 10.1016 3.67969 9.96094 3.53906C9.82031 3.39844 9.75 3.21875 9.75 3V2.25H6.75V9.75H7.875C8.09375 9.75 8.27344 9.82031 8.41406 9.96094C8.55469 10.1016 8.625 10.2812 8.625 10.5C8.625 10.7188 8.55469 10.8984 8.41406 11.0391C8.27344 11.1797 8.09375 11.25 7.875 11.25H4.125C3.90625 11.25 3.72656 11.1797 3.58594 11.0391C3.44531 10.8984 3.375 10.7188 3.375 10.5C3.375 10.2812 3.44531 10.1016 3.58594 9.96094C3.72656 9.82031 3.90625 9.75 4.125 9.75H5.25V2.25H2.25Z'
        fill='#012B30'
      />
    </svg>
  );
}
