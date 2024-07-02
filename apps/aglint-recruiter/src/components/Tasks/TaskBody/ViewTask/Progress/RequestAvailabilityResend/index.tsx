import { DatabaseView } from '@aglint/shared-types';
import axios from 'axios';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import toast from '@/src/utils/toast';

function RequestAvailabilityResend({
  selectedTask,
}: {
  selectedTask: DatabaseView['tasks_view'];
}) {
  return (
    <GlobalBanner
      color={'warning'}
      iconName={'schedule'}
      textTitle={'Waiting for candidates availability submission'}
      textDescription={
        <div
          dangerouslySetInnerHTML={{
            __html: `Candidate received a link to choose multiple options for ${selectedTask.session_ids.map((ele) => `<b>${ele.name}</b>`)} Interviews.`,
          }}
        ></div>
      }
      slotButtons={
        <>
          <ButtonSolid
            textButton={'Resend invite'}
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
                axios.post(`/api/emails/sendAvailReqReminder_email_applicant`, {
                  meta: {
                    avail_req_id: selectedTask.request_availability_id,
                  },
                });

                toast.message('Resend invited link sent successfully!');
              },
            }}
          />
          <ButtonSoft
            textButton={'Copy invite'}
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${selectedTask.request_availability_id}`,
                );
                toast.message('Invited link copied!');
              },
            }}
          />
        </>
      }
    />
  );
}

export default RequestAvailabilityResend;
