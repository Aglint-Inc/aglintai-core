import InterviewerLeaderboardWidget from './InterviewerLeaderboardWidget';
import InterviewersDeclineTable from './InterviewersDeclineTable';
import InterviewersTable from './InterviewersTable';

export default function TrainingDashboard() {
  return (
    <div className='w-full max-w-6xl mx-auto'>
      <InterviewerLeaderboardWidget />
      <InterviewersDeclineTable />
      <InterviewersTable />
    </div>
  );
}
