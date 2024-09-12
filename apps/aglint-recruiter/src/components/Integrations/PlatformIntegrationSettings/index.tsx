import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import Link from 'next/link';

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
      <div className='w-[960px] mx-auto mt-4'>
        <div className='flex flex-col'>
          <h1 className='text-xl font-bold mb-4'>
            {capitalizeFirstLetter(params.platform)} Integration Settings
          </h1>
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
        </div>
        <div className='mt-4'>{switchToPlatform(params.platform)}</div>
      </div>
    </>
  );
}

export default PlatformIntegrationSettingsComponent;

function switchToPlatform(platform: string) {
  switch (platform) {
    case 'greenhouse':
      return <GreenhouseSettings />;
    default:
      return (
        <div className='flex flex-col w-[460px] mx-auto items-center justify-center min-h-screen'>
          <h1 className='text-2xl font-bold mb-4'>Page Not Found</h1>
          <p className='text-base mb-8'>
            The requested integration platform is not available. Please contact
            support at support@aglinthq.com for assistance.
          </p>
          <Link
            href={ROUTES['/integrations']()}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            Go to Integrations
          </Link>
        </div>
      );
  }
}
