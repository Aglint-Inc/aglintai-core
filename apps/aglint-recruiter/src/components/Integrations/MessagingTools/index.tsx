import SlackLogo from '@public/images/integration/slack-logo.svg';
import capitalize from 'lodash/capitalize';

import { IntegrationCard } from '../components/IntegrationCard';
import { type MessagingToolsType } from '../types';

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
    <div className='grid gap-4'>
      {messagingTools.map((item, i) => (
        <IntegrationCard
          key={i}
          slotLogo={item.logo}
          textName={capitalize(item.name)}
          textLink={item.url}
          onClick={() => {
            window.open(
              'https://' + item.url.replace('slack.com', 'slack.com/signin'),
            );
          }}
        />
      ))}
    </div>
  );
}

export default MessagingTools;
