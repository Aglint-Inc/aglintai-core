import AssessmentDashboard from '@/src/components/CandidateAssessment/AssessmentDashboard';
import { CandidateAssessmentProvider } from '@/src/context/CandidateAssessment';

function AssessmentPage() {
  return (
    <div>
      <CandidateAssessmentProvider>
        <AssessmentDashboard />
      </CandidateAssessmentProvider>
    </div>
  );
}
export default AssessmentPage;
AssessmentPage.getLayout = (page) => {
  return <>{page}</>;
};
