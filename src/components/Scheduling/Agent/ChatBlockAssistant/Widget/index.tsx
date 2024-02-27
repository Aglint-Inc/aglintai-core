import { Stack } from '@mui/material';

import { WidgetFlexRow, WidgetPanelCard, WidgetUserCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import AvailabilitySlotSelect from './AvailabilitySlotSelect/AvailabilitySlotSelect';
import SelectConfirmedSlots from './SelectConfirmedSlots';
import SelectPanel from './SelectPanel';
import SelectPanelUsers from './SelectPanelUsers';
import { FunctionResponse } from '../../types';

function WidgetComp({
  functionResp,
  index,
}: {
  message: string;
  functionResp: FunctionResponse[];
  index: number;
}) {
  const { submitHandler } = useSchedulingAgent();

  const funct = functionResp[functionResp.length - 1];
  if (!funct || !funct?.response) {
    return '';
  }

  switch (funct.name) {
    case 'find-intersection-confirmed-slot':
      if ('slots' in funct.response) {
        return (
          <SelectConfirmedSlots slots={funct.response.slots} index={index} />
        );
      }
      break;
    case 'fetch-all-interview-panel':
      if ('panels' in funct.response) {
        const panels = funct.response.panels;
        return (
          <Stack sx={{ pointerEvents: 'none' }}>
            <SelectPanel panels={panels} />
          </Stack>
        );
      }
      break;

    case 'select-panel-users-for-scheduling':
      if ('panel' in funct.response) {
        const panel = funct.response.panel;
        return <SelectPanelUsers panel={panel} index={index} />;
      }
      break;

    case 'fetch-user-by-name':
      if ('panels' in funct.response) {
        // Handle 'panels' property
        const panels = funct.response.panels;
        return <SelectPanel panels={panels} />;
      } else if ('users' in funct.response) {
        const users = funct.response.users;
        return (
          <WidgetFlexRow
            slorWidgetIndividual={users?.map((user) => {
              return (
                <WidgetUserCard
                  key={user.applications.id}
                  textName={user.candidate.first_name}
                  textEmail={user.candidate.email}
                  slotUserAvatar={
                    <MuiAvatar
                      key={user.candidate.id}
                      src={user.candidate?.avatar}
                      level={user.candidate?.first_name}
                      variant='circular'
                      height='28px'
                      width='28px'
                      fontSize='12px'
                    />
                  }
                  onClickUser={{
                    onClick: () => {
                      submitHandler({
                        input: `User is ${JSON.stringify(user)}`,
                        selectedItem: {
                          selectedUser: user,
                          message: `Candidate is ${JSON.stringify(user.candidate.first_name)}`,
                        },
                      });
                    },
                  }}
                />
              );
            })}
          />
        );
      }
      break;
    case 'find_available_time_slots': {
      if ('panels' in funct.response) {
        const panels = funct.response.panels;
        return (
          <WidgetFlexRow
            slorWidgetIndividual={panels?.map((panel) => (
              <WidgetPanelCard
                key={panel.id}
                textPanelName={panel.name}
                onClickCard={{
                  onClick: () => {
                    submitHandler({
                      input: `here is the panel name ${panel.name}`,
                    });
                  },
                }}
              />
            ))}
          />
        );
      } else if ('slots' in funct.response) {
        return (
          <AvailabilitySlotSelect slots={funct.response.slots} index={index} />
        );
      }
      break;
    }

    default:
      return '';
  }
}

export default WidgetComp;
