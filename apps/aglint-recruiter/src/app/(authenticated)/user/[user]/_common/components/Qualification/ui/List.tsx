import { type InterviewerDetailType } from '../../../hooks/useInterviewer';

export const List = ({
  interviewType,
}: {
  interviewType: InterviewerDetailType['interview_type'][number];
}) => {
  return (
    <div className='rounded-lg bg-gray-50 p-4'>
      <div className='mb-2 text-sm font-medium'>
        {interviewType.module_name}
      </div>
      <div className='flex flex-col gap-2'>
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
          title='Canceled Slots'
          value={interviewType.cancelled_meeting_count || 0}
        />
      </div>
    </div>
  );
};
const Card = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <p className='w-3/5 text-sm text-muted-foreground'>{title}</p>
      <p className='text-sm text-muted-foreground'>:</p>
      <p className='text-sm font-medium'>{value} min</p>
    </div>
  );
};
