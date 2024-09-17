import { AvailabilityBlock } from './AvailabilityBlock';
import NextInterviewBlock from './NextInterviewBlock';
import { RecruitingTeamBlock } from './RecruitingTeamBlock';
import { ScheduleInterviewBlock } from './ScheduleInterviewBlock';

export default function InterviewScheduler() {
  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-4 shadow'>
      <h1 className='mb-6 text-2xl font-bold'>Whats next?</h1>
      <ScheduleInterviewBlock />
      <AvailabilityBlock />
      <NextInterviewBlock />
      <RecruitingTeamBlock />
    </div>
  );
}
