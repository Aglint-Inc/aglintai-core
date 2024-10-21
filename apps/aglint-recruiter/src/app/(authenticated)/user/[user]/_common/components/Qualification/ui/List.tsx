import { type InterviewerDetailType } from '../../../hooks/useInterviewer';

export const List = ({
  interviewType,
}: {
  interviewType: InterviewerDetailType['interview_type'][number];
}) => {
  return (
    <div className='rounded-lg bg-muted p-4'>
      <div className='mb-2 text-sm font-medium'>
        {interviewType.module_name}
      </div>
      <div className='flex gap-2'>
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
    <div className='flex-1'>
      <p className='text-sm font-medium'>{value} min</p>
      <p className='text-sm text-muted-foreground'>{title}</p>
    </div>
  );
};
