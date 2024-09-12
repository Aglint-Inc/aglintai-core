import { Skeleton } from '@components/ui/skeleton';
import { AtsCard } from '@devlink/AtsCard';
import { SideDrawerLarge } from '@devlink3/SideDrawerLarge';
import { Drawer, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { STATE_GREENHOUSE_DIALOG } from '@/jobs/constants';
import { useIntegrationActions, useIntegrations, useJobs } from '@/jobs/hooks';
import { useAllIntegrations } from '@/queries/intergrations';
import toast from '@/utils/toast';

import NoAtsResult from '../NoAtsResult';
import { POSTED_BY } from '../utils';
import { type JobGreenhouse } from './types';
import { fetchAllJobs, getGreenhouseStatusColor } from './utils';

export function GreenhouseModal() {
  const { setIntegration, handleClose } = useIntegrationActions();
  const integration = useIntegrations();
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
      setIntegration({
        greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
      });

      // const public_job_id = await axios.call(
      //   'POST',
      //   '/api/integrations/greenhouse/sync/job',
      //   {
      //     ats_job: selectedGreenhousePostings[0],
      //   },
      // );

      // if (public_job_id) {
      //   await handleJobsRefresh();
      //   //closing modal once done
      //   setIntegration(({
      //     greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
      //   }));
      //   router.push(ROUTES['/jobs/[job]']({ id: String(public_job_id) }));
      // } else {
      //   toast.error(
      //     'Import failed. Please try again later or contact support for assistance.',
      //   );
      //   posthog.capture('GreenHouse Import Error');
      //   handleClose();
      // }
    } catch (error) {
      toast.error(
        'Import failed. Please try again later or contact support for assistance.',
      );
      handleClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Drawer
      anchor={'right'}
      open={integration.greenhouse.open}
      onClose={() => {
        if (saving) return;
        handleClose();
      }}
    >
      <SideDrawerLarge
        textDrawertitle={'Import from Greenhouse'}
        drawerSize={'small'}
        slotButtons={
          <>
            <UIButton
              variant='secondary'
              size='sm'
              onClick={() => {
                if (saving) return;
                handleClose();
              }}
            >
              Close
            </UIButton>

            <UIButton
              variant='default'
              size='sm'
              isLoading={saving}
              disabled={selectedGreenhousePostings.length === 0}
              onClick={() => {
                if (saving) return;
                importGreenhouse();
              }}
            >
              Import
            </UIButton>
          </>
        }
        slotSideDrawerbody={
          <Stack
            spacing={'var(--space-2)'}
            padding={'var(--space-2)'}
            height={'calc(100vh - 96px)'}
          >
            {!initialFetch ? (
              postings.length > 0 ? (
                postings.map((post, ind) => {
                  return (
                    <AtsCard
                      key={ind}
                      isChecked={
                        selectedGreenhousePostings?.filter(
                          (p) => p.id === post.id,
                        )?.length > 0
                      }
                      onClickCheck={{
                        onClick: () => {
                          setSelectedGreenhousePostings([post]);
                        },
                      }}
                      propsTextColor={{
                        style: {
                          color: getGreenhouseStatusColor(post),
                        },
                      }}
                      textRole={post.title}
                      textStatus={
                        post.live ? 'Live' : post.active ? 'Active' : 'Closed'
                      }
                      textWorktypeLocation={post.location.name}
                    />
                  );
                })
              ) : (
                <NoAtsResult />
              )
            ) : (
              <>
                <Skeleton className='w-full h-16 mb-2' />{' '}
                <Skeleton className='w-full h-16 mb-2' />
                <Skeleton className='w-full h-16 mb-2' />{' '}
                <Skeleton className='w-full h-16 mb-2' />
                <Skeleton className='w-full h-16 mb-2' />{' '}
                <Skeleton className='w-full h-16 mb-2' />
              </>
            )}
          </Stack>
        }
      />
    </Drawer>
  );
}
