import capitalize from 'lodash/capitalize';
import Image from 'next/image';

import { IntegrationCard } from '../components/IntegrationCard';
import { type MessagingToolsType } from '../types';

function MessagingTools() {
  const messagingTools = [
    {
      name: 'slack' as MessagingToolsType,
      url: 'slack.com',
      logo: (
        <Image
          src={'/images/integration/slack-logo.svg'}
          alt={'Slack'}
          width={40}
          height={40}
        />
      ),
    },
    // {
    //   name: 'teams' as MessagingToolsType,
    //   url: 'teams.live.com',
    //   logo: (
    //     <Image
    //       src={'/images/integration/teams-logo.svg'}
    //       alt={'Teams'}
    //       width={40}
    //       height={40}
    //     />
    //   ),
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
