import AssessmentDashboard from '@/src/components/CandidateAssessment/AssessmentDashboard';
import Seo from '@/src/components/Common/Seo';
import { CandidateAssessmentProvider } from '@/src/context/CandidateAssessment';

function AssessmentPage() {
  return (
    <div>
      <Seo title='Candidate Assessment | Aglint AI' />
      <CandidateAssessmentProvider>
        <AssessmentDashboard />
      </CandidateAssessmentProvider>
    </div>
  );
}
export default AssessmentPage;
AssessmentPage.publicProvider = (page) => {
  return <>{page}</>;
};
