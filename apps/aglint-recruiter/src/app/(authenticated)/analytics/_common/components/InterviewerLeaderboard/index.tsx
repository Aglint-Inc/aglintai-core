import InterviewerLeaderboardWidget from './InterviewerLeaderboardWidget';
import InterviewersDeclineTable from './InterviewersDeclineTable';
import InterviewersTable from './InterviewersTable';

export default function InterviewerLeaderboard() {
  return (
    <>
      <InterviewerLeaderboardWidget />
      <InterviewersDeclineTable />
      <InterviewersTable />
    </>
  );
}
