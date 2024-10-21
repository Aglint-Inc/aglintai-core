'use client';
import InterviewerLeaderboardWidget from './InterviewerLeaderboardWidget';
import InterviewersDeclineTable from './InterviewersDeclineTable';
import InterviewersTable from './InterviewersTable';

export default function InterviewerLeaderboard() {
  return (
    <div className='flex flex-col space-y-16'>
      <InterviewerLeaderboardWidget />
      <InterviewersDeclineTable />
      <InterviewersTable />
    </div>
  );
}
