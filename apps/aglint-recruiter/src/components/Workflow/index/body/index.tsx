import { useCallback, useMemo, useState } from 'react';

import { WorkflowLanding } from '@/devlink3/WorkflowLanding';
import Seo from '@/src/components/Common/Seo';
import { useTour } from '@/src/context/TourContext';

import Content from './content';
import Filters from './filters';

const Body = () => {
  const {
    tour: { data },
    handleCreateTourLog,
  } = useTour();
  const [tip, setTip] = useState(false);
  const firstVisit = useMemo(
    () => !(data ?? ['workflow_intro']).includes('workflow_intro'),
    [data],
  );
  const open = useMemo(() => firstVisit || tip, [firstVisit, tip]);
  const handleTip = useCallback(() => {
    if (open) {
      if (firstVisit) handleCreateTourLog({ type: 'workflow_intro' });
      setTip(false);
    } else setTip(true);
  }, [handleCreateTourLog, firstVisit, open]);
  return (
    <>
      <Seo title='Workflow | Aglint AI' description='AI for People Products' />
      <WorkflowLanding
        slotSearchAndFilter={<Filters />}
        slotWorkflowCard={<Content />}
        onClickClose={{
          onClick: () => handleTip(),
          style: { transform: `rotate(${open ? '0deg' : '180deg'})` },
        }}
        styleWidth={{ style: { width: open ? '400px' : '10px' } }}
      />
    </>
  );
};

export default Body;
