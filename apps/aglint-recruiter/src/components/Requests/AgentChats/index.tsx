/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { getFullName } from '@aglint/shared-utils';

import { AglintAiChat } from '@/devlink2/AglintAiChat';
import { AglintAiWelcome } from '@/devlink2/AglintAiWelcome';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import AgentInputBox from './AgentInputBox';
import CommandShortCuts from './CommandShortCuts';

function AgentChats() {
  const { recruiterUser } = useAuthDetails();
  return (
    <>
      <AglintAiChat
        slotAiInput={<AgentInputBox />}
        slotAiBody={
          <AglintAiWelcome
            slotStartOption={<CommandShortCuts />}
            textAiHeader={
              `Good morning, ` + getFullName(recruiterUser.first_name, '')
            }
          />
        }
      />
    </>
  );
}

export default AgentChats;
