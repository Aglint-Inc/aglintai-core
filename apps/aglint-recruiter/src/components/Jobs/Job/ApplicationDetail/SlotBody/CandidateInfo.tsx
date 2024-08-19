import { ApplicantInfoBox } from '@/devlink2/ApplicantInfoBox';
import CandidateDefaultIcon from '@/src/components/Common/Icons/CandidateDefaultIcon';
import { useApplication } from '@/src/context/ApplicationContext';

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
        <ApplicantInfoBox
          isDepartmentVisible={false}
          textName={applicationDetail.name}
          textEmail={applicationDetail.email}
          isRoleVisible={Boolean(applicationDetail.current_job_title)}
          textRole={applicationDetail.current_job_title || '--'}
          slotImage={<CandidateDefaultIcon />}
          isLinkedInVisible={!!resume.resume_json?.basics.linkedIn}
          onClickLinkedIn={{
            onClick: () => {
              window.open(
                `https://${resume.resume_json?.basics.linkedIn}`,
                '_blank',
              );
            },
          }}
          textLocation={applicationDetail.city || '--'}
          textDepartment={'--'}
          textPhone={applicationDetail.phone || '--'}
          textTimeZone={applicationDetail.timezone || '--'}
        />
      )}
    </>
  );
}

export default CandidateInfo;
