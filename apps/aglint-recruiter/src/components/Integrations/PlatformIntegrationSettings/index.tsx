import React from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import Seo from '../../Common/Seo';
import GreenhouseSettings from './Greenhouse';

function PlatformIntegrationSettingsComponent() {
  const { push, params } = useRouterPro();
  return (
    <>
      <Seo
        title={`Integrations | Aglint AI`}
        description='AI for People Products'
      />
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              textName='Integrations'
              isLink={true}
              onClickLink={() => push(ROUTES['/integrations']())}
            />
            <Breadcrum
              textName={`${capitalizeFirstLetter(params.platform)} Setting`}
              showArrow={true}
              isLink={false}
            />
          </>
        }
        slotBody={switchToPlatform(params.platform)}
      />
    </>
  );
}

export default PlatformIntegrationSettingsComponent;

function switchToPlatform(platform: string) {
  switch (platform) {
    case 'greenhouse':
      return <GreenhouseSettings />;
    default:
      return <GlobalEmptyState />;
  }
}
