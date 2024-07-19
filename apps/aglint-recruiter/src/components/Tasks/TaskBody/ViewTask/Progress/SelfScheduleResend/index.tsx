import { getFullName } from '@aglint/shared-utils';
import { Stack, Tooltip } from '@mui/material';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import UITypography from '@/src/components/Common/UITypography';
import { onClickResendInvite } from '@/src/components/Scheduling/CandidateDetails/utils';
import { onClickCopyLink } from '@/src/components/Scheduling/ScheduleDetails/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

function SelfScheduleResend({
  selectedTask,
}: {
  selectedTask: TasksAgentContextType['tasks'][0];
}) {
  const { recruiterUser } = useAuthDetails();
  //tooltip for copy link
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleButtonClick = () => {
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 700);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const copyLink = async () => {
    const { data: sch } = await supabase
      .from('interview_schedule')
      .select()
      .eq('application_id', selectedTask.application_id)
      .single()
      .throwOnError();
    onClickCopyLink({
      filter_id: selectedTask.filter_id,
      request_id: null,
      schedule_id: sch.id,
      task_id: selectedTask.id,
    });
    handleButtonClick();
  };

  return (
    <GlobalBannerShort
      color={'warning'}
      iconName={'schedule'}
      textTitle={'Resend Self Schedule Invite'}
      textDescription={
        <div
          dangerouslySetInnerHTML={{
            __html: `Candidate received a self scheduling link to book for ${selectedTask.session_ids.map((ele) => `<b>${ele.name}</b>`)}.`,
          }}
        ></div>
      }
      slotButtons={
        <>
          <ButtonSolid
            textButton={'Resend Invite'}
            isLoading={false}
            isLeftIcon={false}
            isRightIcon={false}
            size={1}
            onClickButton={{
              onClick: () => {
                onClickResendInvite({
                  application_id: selectedTask.application_id,
                  candidate_name: getFullName(
                    selectedTask.applications.candidates.first_name,
                    selectedTask.applications.candidates.last_name,
                  ),
                  filter_id: selectedTask.filter_id,
                  rec_user_id: recruiterUser.user_id,
                  request_id: null,
                  session_name: selectedTask.session_ids
                    .map((ele) => ele.name)
                    .join(', '),
                  task_id: selectedTask.id,
                });

                toast.message('Resend invited link sent successfully!');
              },
            }}
          />
          <Tooltip
            title={<UITypography type='extraSmall'>Link Copied</UITypography>}
            open={tooltipOpen}
            disableHoverListener
            disableFocusListener
            disableTouchListener
            onClose={handleTooltipClose}
          >
            <Stack>
              <ButtonSoft
                textButton={'Copy Invite'}
                isLoading={false}
                isLeftIcon={false}
                isRightIcon={false}
                size={1}
                onClickButton={{
                  onClick: copyLink,
                }}
              />
            </Stack>
          </Tooltip>
        </>
      }
    />
  );
}

export default SelfScheduleResend;
