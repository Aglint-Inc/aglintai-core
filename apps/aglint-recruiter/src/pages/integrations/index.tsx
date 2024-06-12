import { useState } from 'react';

import { ButtonSurface } from '@/devlink2/ButtonSurface';
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
          <ButtonSurface
            size='2'
            isRightIcon={false}
            onClickButton={{
              onClick: () => {
                setIsOpen(true);
              }
            }}
            isLeftIcon={true}
            iconName={'outgoing_mail'}
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
