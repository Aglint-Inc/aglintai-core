'use client';
import InterviewerLeaderboardWidget from './InterviewerLeaderboardWidget';
import InterviewersDeclineTable from './InterviewersDeclineTable';
import InterviewersTable from './InterviewersTable';

export default function InterviewerLeaderboard() {
  return (
    <div className='flex flex-col gap-4 pb-4'>
      <InterviewerLeaderboardWidget />
      <InterviewersDeclineTable />
      <InterviewersTable />
    </div>
  );
}
