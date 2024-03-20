import SelectPanel from './SchedulingFlow/SelectPanel';
import SelectUsers from './SchedulingFlow/SelectUsers';
import { FunctionResponse } from '../../types';

function WidgetComp({
  functionResp,
  // eslint-disable-next-line no-unused-vars
  index,
}: {
  message: string;
  functionResp: FunctionResponse[];
  index: number;
}) {
  const funct = functionResp[functionResp.length - 1];
  if (!funct || !funct?.response) {
    return <></>;
  }

  switch (funct.name) {
    case 'fetch-user-by-name':
      if ('panels' in funct.response) {
        const panels = funct.response.panels;
        return <SelectPanel panels={panels} />;
      } else if ('users' in funct.response) {
        const users = funct.response.users;
        return <SelectUsers users={users} />;
      }
      break;

    default:
      return <></>;
  }
}

export default WidgetComp;
