import { ScrollArea } from '@components/ui/scroll-area';
import { FileX } from 'lucide-react';

import { SectionCard } from '@/authenticated/components/SectionCard';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';

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

const List = ({
  interviewType,
}: {
  interviewType: InterviewerDetailType['interview_type'][number];
}) => {
  return (
    <div className='rounded-lg bg-gray-50 p-4'>
      <h3 className='mb-2 text-base font-medium'>
        {interviewType.module_name}
      </h3>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        <Card
          title='Duration'
          value={interviewType.completed_meeting_duration || 0}
        />
        <Card
          title='Completed Slots'
          value={interviewType.completed_meeting_count || 0}
        />
        <Card
          title='Upcoming Slots'
          value={interviewType.confirmed_meeting_count || 0}
        />
        <Card
          title='Cancalled Slots'
          value={interviewType.cancelled_meeting_count || 0}
        />
      </div>
    </div>
  );
};
const Card = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <div>
      <p className='text-sm text-gray-500'>{title}</p>
      <p className='text-base font-bold'>{value} min</p>
    </div>
  );
};
