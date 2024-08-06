/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { getFullName } from '@aglint/shared-utils';

import { AglintAiChat } from '@/devlink2/AglintAiChat';
import { AglintAiWelcome } from '@/devlink2/AglintAiWelcome';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

import Loader from '../../Common/Loader';
import AgentInputBox from './AgentInputBox';
import CommandShortCuts from './CommandShortCuts';

function AgentChats() {
  const { recruiterUser } = useAuthDetails();
  const { data, isLoading } = useUserChat({ user_id: recruiterUser.user_id });

  return (
    <>
      <AglintAiChat
        slotAiInput={<AgentInputBox />}
        slotAiBody={
          isLoading ? (
            <Loader />
          ) : data && data.length > 0 ? (
            data.map((chat, index) => (
              <div key={index}>
                <div>
                  <div>{chat.title}</div>
                  <div>{chat.created_at}</div>
                </div>
              </div>
            ))
          ) : (
            <AglintAiWelcome
              slotStartOption={<CommandShortCuts />}
              textAiHeader={
                `Good morning, ` + getFullName(recruiterUser.first_name, '')
              }
            />
          )
        }
      />
    </>
  );
}

export default AgentChats;
