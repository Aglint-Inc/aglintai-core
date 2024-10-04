'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import Link from 'next/link';

import Seo from '@/common/Seo';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import GreenhouseSettings from './Greenhouse';

function PlatformIntegrationSettingsComponent() {
  const { push, params } = useRouterPro();
  return (
    <>
      <Seo
        title={`Integrations | Aglint AI`}
        description='AI for People Products'
      />
      <div className='mx-auto mt-4 w-[960px]'>
        <div className='flex flex-col'>
          <h1 className='mb-4 text-xl font-bold'>
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
        <div className='mx-auto flex min-h-screen w-[460px] flex-col items-center justify-center'>
          <h1 className='mb-4 text-2xl font-bold'>Page Not Found</h1>
          <p className='mb-8 text-base'>
            The requested integration platform is not available. Please contact
            support at support@aglinthq.com for assistance.
          </p>
          <Link
            href={ROUTES['/integrations']()}
            className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
          >
            Go to Integrations
          </Link>
        </div>
      );
  }
}
