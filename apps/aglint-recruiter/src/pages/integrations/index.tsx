import { Stack } from '@mui/material';
import { IconCategory } from '@tabler/icons-react';
import { useState } from 'react';

import { ButtonTextRegular } from '@/devlink/ButtonTextRegular';
import { PageLayout } from '@/devlink2/PageLayout';
import Seo from '@/src/components/Common/Seo';
import Integrations from '@/src/components/Integrations';
import RequestNew from '@/src/components/Integrations/RequestNewPopUp';

function IntegrationsPage() {
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <Seo
        title={`Integrations | Aglint AI`}
        description='AI for People Products'
      />
      <PageLayout
        slotTopbarLeft={'Integrations'}
        slotTopbarRight={
          <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
            <ButtonTextRegular
              onClickButton={{
                onClick: () => {
                  setIsOpen(true);
                },
              }}
              slotStartIcon={<IconCategory />}
              isStartIcon={true}
              textLabel={'Request Integration'}
            />
          </Stack>
        }
        slotBody={<Integrations />}
      />
      <RequestNew close={close} isOpen={isOpen} />
    </>
  );
}

export default IntegrationsPage;
