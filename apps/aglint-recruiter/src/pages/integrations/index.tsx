import { IconCategory } from '@tabler/icons-react';
import { useState } from 'react';

import { ButtonGhost } from '@/devlink2/ButtonGhost';
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
          <ButtonGhost
            size='2'
            isRightIcon={false}
            onClickButton={{
              onClick: () => {
                setIsOpen(true);
              }
            }}
            
            slotIcon={<IconCategory width='16' height='16' />}
            textButton={'Request Integration'}
          />
        }
        slotBody={<Integrations />}
      />
      <RequestNew close={close} isOpen={isOpen} />
    </>
  );
}

export default IntegrationsPage;
