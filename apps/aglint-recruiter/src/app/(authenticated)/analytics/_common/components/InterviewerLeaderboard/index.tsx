import InterviewerLeaderboardWidget from './InterviewerLeaderboardWidget';
import InterviewersDeclineTable from './InterviewersDeclineTable';
import InterviewersTable from './InterviewersTable';

export default function InterviewerLeaderboard() {
  return (
    <div className='w-full max-w-6xl mx-auto'>
      <InterviewerLeaderboardWidget />
      <InterviewersDeclineTable />
      <InterviewersTable />
    </div>
  );
}
