import { AvatarGroup } from '@mui/material';

import { WidgetFlexRow, WidgetPanelCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { PanelType } from '@/src/components/Scheduling/Panels/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import {
  setLoading,
  setSelectedChat,
  useSchedulingAgentStore,
} from '../../../store';

function SelectPanel({
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
  const selectedChat = useSchedulingAgentStore((state) => state.selectedChat);
  const { updateAllChat } = useSchedulingAgent();

  const submitHandler = (message: string, selectedPanel?: PanelType) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addMessageToChatHistory(message, selectedPanel);
    }, 1500);
  };

  const addMessageToChatHistory = (
    message: string,
    selectedPanel?: PanelType,
  ) => {
    const updatedHistory = [
      ...selectedChat.history,
      {
        type: 'user',
        value: message,
        selectedItem:
          {
            selectedPanel,
            message: `Schedule with panel ${selectedPanel.name}`,
          } || null,
        created_at: new Date().toISOString(),
      },
    ];

    setSelectedChat({
      history: updatedHistory,
    } as any);

    const histAfterAssisResponse = [
      ...updatedHistory,
      {
        type: 'assistant',
        value: `Select users from panel ${selectedPanel.name}`,
        funcRes: [
          {
            name: 'select-panel-users-for-scheduling',
            response: {
              panel: selectedPanel,
            },
          } as any,
        ],
        created_at: new Date().toISOString(),
      },
    ];

    setSelectedChat({
      history: histAfterAssisResponse,
    } as any);

    updateAllChat(histAfterAssisResponse as any);
  };

  return (
    <WidgetFlexRow
      slorWidgetIndividual={panels?.map((panel) => (
        <WidgetPanelCard
          textMemberCount={`${panel.relations?.length} members` || 0}
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
              submitHandler(
                `Schedule with panel ${panel.id}`,
                panel as unknown as PanelType,
              );
            },
          }}
        />
      ))}
    />
  );
}

export default SelectPanel;
