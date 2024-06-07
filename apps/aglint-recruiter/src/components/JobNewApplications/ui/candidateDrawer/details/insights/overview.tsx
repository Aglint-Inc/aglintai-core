import { Stack } from '@mui/material';
import { useState } from 'react';

import { SummaryBlock } from '@/devlink2/SummaryBlock';
import { useApplication } from '@/src/context/ApplicationContext';

const Overview = () => {
  const [collapse, setCollapse] = useState(true);
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Overview Loading...</>;
  if (data?.resume?.resume_json?.overview)
    return (
      <SummaryBlock
        arrowProps={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          },
        }}
        title={'Overview'}
        description={
          <Stack
            className={`job_application_overview_${collapse ? 'un' : ''}clamped`}
          >
            {data.resume.resume_json.overview}
          </Stack>
        }
        descriptionTextProps={{
          onClick: () => setCollapse((prev) => !prev),
          style: { cursor: 'pointer' },
        }}
        wrapperProps={{ style: { backgroundColor: '#f5fcfc' } }}
      />
    );
  return <></>;
};

export { Overview };
