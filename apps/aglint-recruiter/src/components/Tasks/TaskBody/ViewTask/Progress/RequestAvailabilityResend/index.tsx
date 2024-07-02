import { DatabaseView } from '@aglint/shared-types';
import { Stack, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import UITypography from '@/src/components/Common/UITypography';
import toast from '@/src/utils/toast';

function RequestAvailabilityResend({
  selectedTask,
}: {
  selectedTask: DatabaseView['tasks_view'];
}) {
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
                    handleButtonClick();
                  },
                }}
              />
            </Stack>
          </Tooltip>
        </>
      }
    />
  );
}

export default RequestAvailabilityResend;
