import { Stack } from '@mui/material';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { Integration } from '@/devlink2/Integration';
import { useAllIntegrations } from '@/src/queries/intergrations';

import ATSTools from './ATSTools';
import MessagingTools from './MessagingTools';
import Scheduling from './SchedulingTools';

function Integrations() {
  const { data: allIntegrations, refetch, isLoading } = useAllIntegrations();

  if (isLoading)
    return (
      <Stack
        direction={'row'}
        alignItems={'center'}
        width={'100%'}
        height={'100vh'}
        justifyContent={'center'}
      >
        <LoaderSvg />
      </Stack>
    );
  else
    return (
      <>
        <Integration
          slotHrTools={
            <ATSTools integrations={allIntegrations} refetch={refetch} />
          }
          slotScheduling={<Scheduling allIntegrations={allIntegrations} />}
          slotMessaging={<MessagingTools />}
        />
      </>
    );
}

export default Integrations;
