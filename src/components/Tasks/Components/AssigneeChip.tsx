import { capitalize } from 'lodash';
import React from 'react';

import { PanelMemberPill } from '@/devlink2';
import { AgentPill } from '@/devlink3';

import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
import { useInterviewerList } from '../../CompanyDetailComp/Interviewers';
import { EmailAgentId, PhoneAgentId } from '../utils';

function AssigneeChip({ assigneeId }: { assigneeId: string }) {
  const { data: members } = useInterviewerList();

  const assigneeDetails = members
    .map((item) => item.rec_user)
    .find((item) => item.user_id === assigneeId);
  return (
    <ShowCode>
      <ShowCode.When isTrue={assigneeId === EmailAgentId}>
        <AgentPill
          isEmailAgentVisible={assigneeId === EmailAgentId}
          isPhoneAgentVisible={false}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={assigneeId === PhoneAgentId}>
        <AgentPill
          isEmailAgentVisible={false}
          isPhoneAgentVisible={assigneeId === PhoneAgentId}
        />
      </ShowCode.When>
      <ShowCode.Else>
        <ShowCode.When isTrue={!!assigneeDetails?.first_name}>
          <PanelMemberPill
            isCloseVisible={false}
            slotImage={
              <MuiAvatar
                height={'25px'}
                width={'25px'}
                src={assigneeDetails?.profile_image}
                variant='circular'
                fontSize='14px'
                level={capitalize(
                  assigneeDetails?.first_name +
                    ' ' +
                    assigneeDetails?.last_name,
                )}
              />
            }
            textMemberName={
              assigneeDetails?.first_name + ' ' + assigneeDetails?.last_name
            }
          />
        </ShowCode.When>
      </ShowCode.Else>
    </ShowCode>
  );
}

export default AssigneeChip;
