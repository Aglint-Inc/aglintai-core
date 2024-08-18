import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { NewTabPill } from '@/devlink3/NewTabPill';

export type TabsType = 'stages' | 'requests' | 'activity';

function Tabs({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const router = useRouter();
  const tab = router.query.tab as TabsType;

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      borderBottom={'1px solid'}
      borderColor={'var(--neutral-6)'}
    >
      <NewTabPill
        isPillActive={tab === 'stages'}
        onClickPill={{
          onClick: () => {
            router.push({
              query: { tab: 'stages' },
              pathname: `/jobs/${job_id}/application/${application_id}`,
            });
          },
        }}
        textLabel={'Stages'}
      />
      <NewTabPill
        isPillActive={tab === 'requests'}
        onClickPill={{
          onClick: () => {
            router.push({
              query: { tab: 'requests' },
              pathname: `/jobs/${job_id}/application/${application_id}`,
            });
          },
        }}
        textLabel={'Requests'}
      />
      <NewTabPill
        isPillActive={tab === 'activity'}
        onClickPill={{
          onClick: () => {
            router.push({
              query: { tab: 'activity' },
              pathname: `/jobs/${job_id}/application/${application_id}`,
            });
          },
        }}
        textLabel={'Activity'}
      />
    </Stack>
  );
}

export default Tabs;
