import { AvatarGroup } from '@mui/material';
import React from 'react';

import { WidgetFlexRow, WidgetPanelCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

function SelectPanelForAvailibility({
  panels,
}: {
  panels: {
    relations: {
      id: string;
      panel_id: string;
      user_id: string;
    }[];
    created_at: string;
    duration_available: JSON;
    id: string;
    name: string;
    recruiter_id: string;
  }[];
}) {
  const { members } = useAuthDetails();
  const { submitHandler } = useSchedulingAgent();
  return (
    <WidgetFlexRow
      slorWidgetIndividual={panels?.map((panel) => (
        <WidgetPanelCard
          key={panel.id}
          textPanelName={panel.name}
          slotAvatarGroup={
            <AvatarGroup
              total={panel.relations?.length || 0}
              sx={{
                '& .MuiAvatar-root': {
                  width: '28px',
                  height: '28px',
                  fontSize: '12px',
                },
              }}
            >
              {panel.relations?.slice(0, 5).map((rel) => {
                const member = members.find(
                  (member) => member.user_id === rel.user_id,
                );
                return (
                  <MuiAvatar
                    key={rel.id}
                    src={member?.profile_image}
                    level={member?.first_name}
                    variant='circular'
                    height='28px'
                    width='28px'
                    fontSize='12px'
                  />
                );
              })}
            </AvatarGroup>
          }
          onClickCard={{
            onClick: () => {
              submitHandler({
                input: `Here is the panel name ${JSON.stringify(panel)} for requesting availibility.`,
                selectedItem: {
                  panel: panel,
                  message: `Schedule with panel ${panel.name}`,
                },
              });
            },
          }}
        />
      ))}
    />
  );
}

export default SelectPanelForAvailibility;
