import { Drawer, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { AtsCard } from '@/devlink/AtsCard';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { NoResultAts } from '@/devlink/NoResultAts';
import { SkeletonLoaderAtsCard } from '@/devlink/SkeletonLoaderAtsCard';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_GREENHOUSE_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { useJobs } from '@/src/context/JobsContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
import toast from '@/src/utils/toast';

import { POSTED_BY } from '../utils';
import { JobGreenhouse } from './types';
import { fetchAllJobs, getGreenhouseStatusColor } from './utils';

export function GreenhouseModal() {
  const { setIntegration, integration, handleClose } = useIntegration();
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
      setIntegration((prev) => ({
        ...prev,
        greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
      }));

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
      //   setIntegration((prev) => ({
      //     ...prev,
      //     greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
      //   }));
      //   router.push(ROUTES['/jobs/[id]']({ id: String(public_job_id) }));
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
        drawerSize={'small'}
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              color={'neutral'}
              textButton={'Close'}
              onClickButton={{
                onClick: () => {
                  if (saving) return;
                  handleClose();
                },
              }}
            />
            <ButtonSolid
              size={2}
              color={'accent'}
              textButton={'Import'}
              isLoading={saving}
              isDisabled={selectedGreenhousePostings.length === 0}
              onClickButton={{
                onClick: () => {
                  if (saving) return;
                  importGreenhouse();
                },
              }}
            />
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
                <NoResultAts />
              )
            ) : (
              <>
                <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
                <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
                <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
              </>
            )}
          </Stack>
        }
      />
    </Drawer>
  );
}
