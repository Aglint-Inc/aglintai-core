import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { AglintAiChat } from '@/devlink2/AglintAiChat';
import { RequestAgent } from '@/devlink2/RequestAgent';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import AgentChats from './AgentChats';
import FilterAndSorting from './FiltersAndSorting';
import Section from './Section';
import StatsCards from './StatsCards';

const Requests = () => {
  const { recruiterUser } = useAuthDetails();
  return (
    <RequestAgent
      textName={getFullName(recruiterUser.first_name, '')}
      textTopStatus={`Your top priorities as of ${dayjsLocal().add(-1, 'day').format('MMM D, YYYY')}`}
      slotFilter={<FilterAndSorting />}
      slotRequestOption={<StatsCards />}
      slotRequestSection={
        <>
          <Section textSectionHeader='Urgent Requests' />
          <Section textSectionHeader='Standard Requests' />
        </>
      }
      slotAglintAiChat={<AglintAiChat slotAiInput={<AgentChats />} />}
    />
  );
};

export default Requests;
