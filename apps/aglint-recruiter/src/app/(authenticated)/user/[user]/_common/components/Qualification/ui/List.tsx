import { type InterviewerDetailType } from '../../../hooks/useInterviewer';

export const List = ({
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
