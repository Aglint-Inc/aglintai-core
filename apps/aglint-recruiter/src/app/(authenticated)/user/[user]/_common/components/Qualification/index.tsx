import {
  Section,
  SectionHeader,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { LibraryBig } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';

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
          <GlobalEmpty
            icon={
              <LibraryBig
                strokeWidth={2}
                className='h-6 w-6 text-muted-foreground'
              />
            }
            description='No qualifications found'
          />
        </div>
      )}
    </Section>
  );
};
