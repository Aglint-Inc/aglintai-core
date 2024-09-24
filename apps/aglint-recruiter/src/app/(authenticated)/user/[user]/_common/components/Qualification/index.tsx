import { ScrollArea } from '@components/ui/scroll-area';
import { FileX } from 'lucide-react';

import { SectionCard } from '@/authenticated/components/SectionCard';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
import { List } from './ui/List';

export const Qualifications = ({
  interview_types,
}: {
  interview_types: InterviewerDetailType['interview_type'];
}) => {
  return (
    <>
      <SectionCard title='Qualifications'>
        <ScrollArea className='h-[360px] w-full'>
          <div className='space-y-4'>
            {interview_types?.length ? (
              interview_types.map((interview_type, index) => (
                <List interviewType={interview_type} key={index} />
              ))
            ) : (
              <div className='flex h-[100px] w-full flex-col items-center justify-center space-y-2 text-gray-500'>
                <FileX size={24} />
                <p>No qualifications found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SectionCard>
    </>
  );
};
