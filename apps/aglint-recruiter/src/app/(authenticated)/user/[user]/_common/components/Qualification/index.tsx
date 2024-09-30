import { ScrollArea } from '@components/ui/scroll-area';
import { LibraryBig } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import UISectionCard from '@/components/Common/UISectionCard';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
import { List } from './ui/List';

export const Qualifications = ({
  interview_types,
}: {
  interview_types: NonNullable<InterviewerDetailType>['interview_type'];
}) => {
  return (
    <>
      <UISectionCard title='Qualifications'>
        <ScrollArea className='max-h-[360px] w-full'>
          <div className='space-y-4'>
            {interview_types?.length ? (
              interview_types?.map((interview_type) => (
                <List
                  interviewType={interview_type}
                  key={interview_type.module_name}
                />
              ))
            ) : (
              <GlobalEmpty
                icon={
                  <LibraryBig
                    strokeWidth={2}
                    className='h-6 w-6 text-muted-foreground'
                  />
                }
                header='No Qualifications interview pro'
              />
            )}
          </div>
        </ScrollArea>
      </UISectionCard>
    </>
  );
};
