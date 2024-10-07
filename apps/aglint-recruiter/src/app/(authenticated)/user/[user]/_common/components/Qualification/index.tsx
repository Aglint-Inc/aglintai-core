import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionHeader,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { LibraryBig } from 'lucide-react';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
import { List } from './ui/List';

export const Qualifications = ({
  interview_types,
}: {
  interview_types: NonNullable<InterviewerDetailType>['interview_type'];
}) => {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Interview Pools</SectionTitle>
      </SectionHeader>
      {interview_types?.length ? (
        <ScrollArea className='h-[180px] w-[calc(100vw-530px)] whitespace-nowrap'>
          <div className='flex w-max space-x-4'>
            {interview_types?.map((interview_type) => (
              <List
                interviewType={interview_type}
                key={interview_type.module_name}
              />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
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
    </Section>
  );
};
