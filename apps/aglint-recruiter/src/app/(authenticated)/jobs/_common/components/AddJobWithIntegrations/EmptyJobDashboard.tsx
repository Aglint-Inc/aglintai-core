import { Button } from '@components/ui/button';

import { useRouterPro } from '@/hooks/useRouterPro';
import { useAllIntegrations } from '@/queries/intergrations';
import ROUTES from '@/utils/routing/routes';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  const router = useRouterPro();
  const { data: allIntegrations } = useAllIntegrations();

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex w-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8'>
        <h2 className='mb-4 text-xl font-semibold'>{heading}</h2>
        {showMsg && (
          <p className='mb-6 text-gray-600'>
            No jobs found. Let&apos;s add some!
          </p>
        )}
        <div className='w-full max-w-md space-y-6'>
          <div className='w-full'>
            <Button
              onClick={handleClickAddJob}
              className='hover:bg-primary-dark w-full bg-primary text-white'
            >
              Add Job Manually
            </Button>
          </div>
          <div className='w-full border-t pt-4'>
            {(allIntegrations?.greenhouse_key ||
              allIntegrations?.ashby_key ||
              allIntegrations?.lever_key) && (
              <h3 className='mb-3 font-semibold'>
                Select an ATS to import jobs from
              </h3>
            )}

            {allIntegrations?.greenhouse_key && (
              <Button
                onClick={() => router.push(ROUTES['/integrations']())}
                variant='outline'
                className='mb-2 w-full'
              >
                Connect to Greenhouse
              </Button>
            )}
            {allIntegrations?.ashby_key && (
              <Button
                onClick={() => router.push(ROUTES['/integrations']())}
                variant='outline'
                className='mb-2 w-full'
              >
                Connect to Ashby
              </Button>
            )}
            {allIntegrations?.lever_key && (
              <Button
                onClick={() => router.push(ROUTES['/integrations']())}
                variant='outline'
                className='mb-2 w-full'
              >
                Connect to Lever
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
