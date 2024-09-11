import { Button } from '@components/ui/button';
import { useRouter } from 'next/router';

import { useAllIntegrations } from '@/queries/intergrations';
import ROUTES from '@/utils/routing/routes';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  const router = useRouter();
  const { data: allIntegrations } = useAllIntegrations();

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center w-[400px]  bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">{heading}</h2>
        {showMsg && (
          <p className="text-gray-600 mb-6">No jobs found. Let&apos;s add some!</p>
        )}
        <div className="space-y-6 w-full max-w-md">
          <div className="w-full">
            <Button onClick={handleClickAddJob} className="w-full bg-primary text-white hover:bg-primary-dark">
              Add Job Manually
            </Button>
          </div>
          <div className="w-full border-t pt-4">
          {(allIntegrations?.greenhouse_key || allIntegrations?.ashby_key || allIntegrations?.lever_key) && (
               <h3 className="font-semibold mb-3">Select an ATS to import jobs from</h3>
            )}
           
            {allIntegrations?.greenhouse_key && (
              <Button onClick={() => router.push(ROUTES['/integrations']())} variant="outline" className="w-full mb-2">
                Connect to Greenhouse
              </Button>
            )}
            {allIntegrations?.ashby_key && (
              <Button onClick={() => router.push(ROUTES['/integrations']())} variant="outline" className="w-full mb-2">
                Connect to Ashby
              </Button>
            )}
            {allIntegrations?.lever_key && (
              <Button onClick={() => router.push(ROUTES['/integrations']())} variant="outline" className="w-full mb-2">
                Connect to Lever
              </Button>
            )}
           
          </div>
        </div>
      </div>
    </div>
  );
}
