import { User } from 'lucide-react';

import { ApplicantInfoBox } from '@/devlink2/ApplicantInfoBox';
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
          slotImage={<User />}
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
