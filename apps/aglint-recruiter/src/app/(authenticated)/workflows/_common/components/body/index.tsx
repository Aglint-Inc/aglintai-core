import Seo from '@/components/Common/Seo';

import Content from './content';
import Filters from './filters';

const Body = () => {
  // const {
  //   tour: { data },
  //   handleCreateTourLog,
  // } = useTour();
  // const [tip, setTip] = useState(false);
  // const firstVisit = useMemo(
  //   () => !(data ?? ['workflow_intro']).includes('workflow_intro'),
  //   [data],
  // );
  // const open = useMemo(() => firstVisit || tip, [firstVisit, tip]);
  // const handleTip = useCallback(() => {
  //   if (open) {
  //     if (firstVisit) handleCreateTourLog({ type: 'workflow_intro' });
  //     setTip(false);
  //   } else setTip(true);
  // }, [handleCreateTourLog, firstVisit, open]);
  return (
    <>
      <Seo title='Workflow | Aglint AI' description='AI for People Products' />
      <div className='flex flex-col gap-4'>
        <Filters />
        <Content />
      </div>
    </>
  );
};

export default Body;
