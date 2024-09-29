import { ScrollArea } from '@components/ui/scroll-area';
import { FileX } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';
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
        <ScrollArea className='h-[360px] w-full'>
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
                icon={<FileX strokeWidth={1} className='h-10 w-10' />}
                header='Not added to any interview pool'
                description='Add to an interview pool to get started'
                primaryAction={<UIButton>Add to Interview Pool</UIButton>}
              />
            )}
          </div>
        </ScrollArea>
      </UISectionCard>
    </>
  );
};
