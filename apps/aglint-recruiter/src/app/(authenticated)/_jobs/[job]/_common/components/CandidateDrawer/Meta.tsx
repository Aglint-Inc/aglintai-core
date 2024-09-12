import UITypography from '@/components/Common/UITypography';
import { useApplication } from '@/context/ApplicationContext';

const Meta = () => {
  const {
    meta: { data, status },
  } = useApplication();
  if (status === 'pending') return <></>;
  return (
    <div className='grid h-16 grid-cols-2 gap-1'>
      {/* Tailwind grid styles */}
      <div className='flex items-center gap-1'>
        <div>
          <UITypography variant='p' type='small'>
            {data.current_job_title ?? '---'}
          </UITypography>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        <div>
          <UITypography variant='p' type='small'>
            {data.city ?? '---'}
          </UITypography>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        <div>
          <UITypography variant='p' type='small'>
            {data.email ?? '---'}
          </UITypography>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        <div>
          <UITypography variant='p' type='small'>
            {data.phone ?? '---'}
          </UITypography>
        </div>
      </div>
    </div>
  );
};

export { Meta };
