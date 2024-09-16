import { useApplication } from '@/context/ApplicationContext';

import { ApplicantInfoBox } from './SlotBody/InterviewTabContent/_common/components/ui/ApplicationInfo';

function CandidateInfo() {
  const {
    details: { data: resume, isLoading },
  } = useApplication();
  const {
    meta: { data: applicationDetail },
  } = useApplication();

  return (
    <>
      {isLoading ? null : (
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
