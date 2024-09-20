import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { Skeleton } from '@components/ui/skeleton';
import { useEffect, useState } from 'react';

import { STATE_GREENHOUSE_DIALOG } from '@/jobs/constants';
import {
  useIntegrationActions,
  useIntegrationStore,
  useJobs,
} from '@/jobs/hooks';
import { useAllIntegrations } from '@/queries/intergrations';
import toast from '@/utils/toast';

import NoAtsResult from '../NoAtsResult';
import { POSTED_BY } from '../utils';
import { type JobGreenhouse } from './types';
import { fetchAllJobs, getGreenhouseStatusColor } from './utils';

export function GreenhouseModal() {
  const { setIntegrations, resetIntegrations } = useIntegrationActions();
  const integration = useIntegrationStore((state) => state.integrations);
  const { jobs } = useJobs();
  const [postings, setPostings] = useState<JobGreenhouse[]>([]);
  const [saving, setSaving] = useState(false);
  const [selectedGreenhousePostings, setSelectedGreenhousePostings] = useState<
    JobGreenhouse[]
  >([]);
  const [initialFetch, setInitialFetch] = useState<boolean>(true);
  const { data: allIntegrations } = useAllIntegrations();

  useEffect(() => {
    if (jobs.status === 'success' && allIntegrations?.greenhouse_key) {
      fetchJobs();
    }
  }, [jobs.status, allIntegrations?.greenhouse_key]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs(allIntegrations?.greenhouse_key);
    setPostings(
      allJobs.filter((post) => {
        if (
          jobs.data?.filter(
            (job) =>
              job.posted_by === POSTED_BY.GREENHOUSE &&
              job.job_title === post.title,
          ).length == 0
        ) {
          return true;
        } else {
          return false;
        }
      }),
    );
    setInitialFetch(false);
  };

  const importGreenhouse = async () => {
    try {
      setSaving(true);
      setIntegrations({
        greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
      });

      // Implement your import logic here
      // ...

      toast.success('Jobs imported successfully');
      resetIntegrations();
    } catch (error) {
      toast.error(
        'Import failed. Please try again later or contact support for assistance.',
      );
      resetIntegrations();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={integration.greenhouse.open} onOpenChange={resetIntegrations}>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='flex flex-col space-y-4'>
          <h2 className='text-lg font-semibold'>Import from Greenhouse</h2>
          <div className='flex h-[calc(100vh-200px)] flex-col space-y-4 overflow-hidden'>
            <p className='text-sm font-medium'>
              {selectedGreenhousePostings.length == 0
                ? `Showing ${postings.length} Jobs from Greenhouse`
                : `${selectedGreenhousePostings.length} Jobs selected`}
            </p>
            <Button
              variant='default'
              disabled={selectedGreenhousePostings.length === 0 || saving}
              onClick={importGreenhouse}
              className='w-full'
            >
              {saving ? 'Importing...' : 'Import'}
            </Button>
            <div className='flex-grow space-y-2 overflow-y-auto'>
              {!initialFetch ? (
                postings.length > 0 ? (
                  postings.map((post, ind) => (
                    <Card key={ind}>
                      <CardContent className='flex items-center justify-between p-4'>
                        <div>
                          <p className='font-medium'>{post.title}</p>
                          <p className='text-sm text-gray-500'>
                            {post.location.name}
                          </p>
                          <p
                            className='text-sm'
                            style={{ color: getGreenhouseStatusColor(post) }}
                          >
                            {post.live
                              ? 'Live'
                              : post.active
                                ? 'Active'
                                : 'Closed'}
                          </p>
                        </div>
                        <Checkbox
                          checked={selectedGreenhousePostings?.some(
                            (p) => p.id === post.id,
                          )}
                          onCheckedChange={() => {
                            setSelectedGreenhousePostings([post]);
                          }}
                        />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <NoAtsResult />
                )
              ) : (
                <>
                  <Skeleton className='mb-2 h-16 w-full' />
                  <Skeleton className='mb-2 h-16 w-full' />
                  <Skeleton className='mb-2 h-16 w-full' />
                  <Skeleton className='mb-2 h-16 w-full' />
                  <Skeleton className='mb-2 h-16 w-full' />
                  <Skeleton className='mb-2 h-16 w-full' />
                </>
              )}
            </div>
          </div>
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={resetIntegrations}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
