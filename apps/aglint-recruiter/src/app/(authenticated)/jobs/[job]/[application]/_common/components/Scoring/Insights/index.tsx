import { Lightbulb } from 'lucide-react';

import ApplicationDetailAccordion from '../../ui/ApplicationDetailAccordian';
import { Badges } from './Badges';
import { Overview } from './Overview';

export const Insights = () => {
  return (
    <>
      <ApplicationDetailAccordion
        title='Insights'
        Icon={Lightbulb}
        headerSlot={<></>}
        isOpen={true}
      >
        <Overview />
        <Badges />
      </ApplicationDetailAccordion>
    </>
  );
};

export default Insights;
