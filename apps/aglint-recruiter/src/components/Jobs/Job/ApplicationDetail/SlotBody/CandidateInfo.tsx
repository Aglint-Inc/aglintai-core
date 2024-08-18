import { useQuery } from '@tanstack/react-query';

import { ApplicantInfoBox } from '@/devlink2/ApplicantInfoBox';
import CandidateDefaultIcon from '@/src/components/Common/Icons/CandidateDefaultIcon';
import { applicationQuery } from '@/src/queries/application';

function CandidateInfo({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const { data: detail, isLoading: isLoadingDetail } = useQuery(
    applicationQuery.meta({
      application_id,
      job_id,
    }),
  );

  const { data: resume, isLoading: isLoadingResume } = useQuery(
    applicationQuery.details({
      application_id,
      job_id,
    }),
  );
  return (
    <div>
      {isLoadingResume || isLoadingDetail ? null : (
        <ApplicantInfoBox
          textName={detail.name}
          textEmail={detail.email}
          textRole={detail.current_job_title || '--'}
          slotImage={<CandidateDefaultIcon />}
          isLinkedInVisible={!!resume.resume_json.basics.linkedIn}
          onClickLinkedIn={{
            onClick: () => {
              window.open(resume.resume_json.basics.linkedIn, '_blank');
            },
          }}
          textLocation={detail.city || '--'}
          textDepartment={'--'}
          textPhone={detail.phone || '--'}
        />
      )}
    </div>
  );
}

export default CandidateInfo;
