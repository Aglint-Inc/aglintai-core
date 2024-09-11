import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';

import { UIPageLayout } from '@/components/Common/UIPageLayout';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

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
      <UIPageLayout
        slotTopbarLeft={
          <>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href='#'
                    onClick={() => push(ROUTES['/integrations']())}
                  >
                    Integrations
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {`${capitalizeFirstLetter(params.platform)} Setting`}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
