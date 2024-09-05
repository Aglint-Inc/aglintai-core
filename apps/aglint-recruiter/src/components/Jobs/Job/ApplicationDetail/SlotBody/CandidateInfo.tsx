import { Button } from '@components/ui/button';
import { ApplicantInfoBox } from '@devlink2/ApplicantInfoBox';
import { User } from 'lucide-react';

import { useApplication } from '@/context/ApplicationContext';

function CandidateInfo() {
  const {
    details: { data: resume, isLoading },
    application_id,
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
          <Button
            onClick={() => {
              window.open(`/candidate/${application_id}/home`, '_blank');
            }}
            size='sm'
            className='bg-slate-100 text-slate-800 hover:bg-slate-200'
          >
            Portal
          </Button>
        </>
      )}
    </>
  );
}

export default CandidateInfo;
