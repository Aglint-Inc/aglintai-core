
import { useApplicationDetails } from '../../hooks/useApplicationDetails';
import { useApplicationMeta } from '../../hooks/useApplicationMeta';
import { ApplicantInfoBox } from '../ui/ApplicationInfo';

function CandidateInfo() {
  const { data: resume, isLoading: isLoadingMeta } = useApplicationDetails();
  const { data: applicationDetail, isLoading: isLoadingDetail } =
    useApplicationMeta();

  return (
    <>
      {isLoadingMeta || isLoadingDetail ? null : (
        <>
          <ApplicantInfoBox
            isDepartmentVisible={false}
            textEmail={applicationDetail.email}
            isRoleVisible={Boolean(applicationDetail.current_job_title)}
            textRole={applicationDetail.current_job_title || '--'}
            isLinkedInVisible={!!resume.resume_json?.basics.linkedIn}
            onClickLinkedIn={() => {
              window.open(
                `https://${resume.resume_json?.basics.linkedIn}`,
                '_blank',
              );
            }}
            textLocation={applicationDetail.city || '--'}
            textDepartment={'--'}
            textPhone={applicationDetail.phone || '--'}
          />
        </>
      )}
    </>
  );
}

export default CandidateInfo;
