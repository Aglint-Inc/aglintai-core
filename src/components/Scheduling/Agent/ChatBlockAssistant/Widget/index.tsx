import { Stack } from '@mui/material';

import { WidgetFlexRow, WidgetPanelCard } from '@/devlink3';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

import AvailabilitySlotSelect from './AvailabilitySlotSelect/AvailabilitySlotSelect';
import AllUsersNotClickable from './ListAllUsers';
import SelectConfirmedSlots from './SchedulingFlow/SelectConfirmedSlots';
import SelectPanel from './SchedulingFlow/SelectPanel';
import SelectPanelUsers from './SchedulingFlow/SelectPanelUsers';
import SelectUsers from './SchedulingFlow/SelectUsers';
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
        const panels = funct.response.panels;
        return <SelectPanel panels={panels} />;
      } else if ('users' in funct.response) {
        const users = funct.response.users;
        return <SelectUsers users={users} />;
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
          <AvailabilitySlotSelect
            slots={funct.response.slots}
            index={index}
            time_duration={funct.response.time_duration}
          />
        );
      }
      break;
    }

    case 'get-all-interviewers':
      if ('users' in funct.response) {
        const users = funct.response.users;
        return <AllUsersNotClickable users={users} />;
      }
      break;

    default:
      return '';
  }
}

export default WidgetComp;
