import { EmptyState } from '@components/empty-state';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { LibraryBig } from 'lucide-react';

import UISectionCard from '@/common/UISectionCard';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
import { List } from './ui/List';

export const Qualifications = ({
  interview_types,
}: {
  interview_types: NonNullable<InterviewerDetailType>['interview_type'];
}) => {
  return (
    <UISectionCard title='Interview Pool'>
      {interview_types?.length ? (
        <ScrollArea className='h-[310px]'>
          <div className='flex max-h-full flex-col gap-4'>
            {[...interview_types, ...interview_types]?.map((interview_type) => (
              <List
                interviewType={interview_type}
                key={interview_type.module_name}
              />
            ))}
          </div>
          <ScrollBar orientation='vertical' />
        </ScrollArea>
      ) : (
        <div className='col-span-3'>
          <EmptyState
            variant='inline'
            icon={LibraryBig}
            description='Not in an interview pool'
          />
        </div>
      )}
    </UISectionCard>
  );
};
