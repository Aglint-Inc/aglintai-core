import { capitalize } from 'lodash';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { IntegrationCard } from '@/devlink2/IntegrationCard';

import { MessagingToolsType } from '../types';
import { SlackLogo } from '../utils';

function MessagingTools() {
  const messagingTools = [
    {
      name: 'slack' as MessagingToolsType,
      url: 'slack.com',
      logo: <SlackLogo />,
    },
    // {
    //   name: 'teams' as MessagingToolsType,
    //   url: 'teams.live.com',
    //   logo: <TeamsLogo />,
    // },
  ];

  return (
    <>
      {messagingTools.map((item, i) => {
        return (
          <IntegrationCard
            onClickCopyLink={{
              onClick: () => {
                window.open(
                  'https://' +
                    item.url.replace('slack.com', 'slack.com/signin'),
                );
              },
            }}
            isComingSoon={false}
            isConnectedVisible={true}
            key={i}
            slotButton={
              <ButtonSoft
                textButton={'Disconnect'}
                size={2}
                color={'neutral'}
              />
            }
            textName={capitalize(item.name)}
            textLink={item.url}
            slotLogo={<>{item.logo}</>}
          />
        );
      })}
    </>
  );
}

export default MessagingTools;
