import { Drawer, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AtsCard } from '@/devlink/AtsCard';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { NoResultAts } from '@/devlink/NoResultAts';
import { SkeletonLoaderAtsCard } from '@/devlink/SkeletonLoaderAtsCard';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import { STATE_GREENHOUSE_DIALOG } from '@/src/context/IntegrationProvider/utils';
import { handleGenerateJd } from '@/src/context/JobContext/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { useAllIntegrations } from '@/src/queries/intergrations';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { POSTED_BY } from '../utils';
import { ExtendedJobGreenhouse, JobGreenhouse } from './types';
import {
  createJobApplications,
  createJobObject,
  fetchAllJobs,
  getGreenhouseStatusColor,
} from './utils';

export function GreenhouseModal() {
  const { recruiter } = useAuthDetails();
  const { setIntegration, integration, handleClose } = useIntegration();
  const router = useRouter();
  const { jobs, handleJobsRefresh } = useJobs();
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
              job.job_title === post.title &&
              job.location == post.location.name,
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

      const refJobsObj = selectedGreenhousePostings.map((post) => {
        return {
          ...post,
          public_job_id: uuidv4(),
          ats_job_id: post.job_id,
          recruiter_id: recruiter.id,
          ats_json: post, //used saving the whole job posting from greenhouse
        };
      });
      //converting greenhouse jobs to db jobs
      const dbJobs = await createJobObject(refJobsObj, recruiter);

      const { data: newJobs, error } = await supabase
        .from('public_jobs')
        .insert(dbJobs)
        .select();

      if (!error) {
        //now creating jobsObj for creating candidates and job_applications
        const jobsObj = selectedGreenhousePostings.map((post) => {
          return {
            ...post,
            public_job_id: (newJobs as any).filter(
              (job) =>
                job.draft.job_title == post.title &&
                job.draft.location == post.location.name,
            )[0].id,
            recruiter_id: recruiter.id,
          };
        }) as unknown as ExtendedJobGreenhouse[];

        const astJobsObj = refJobsObj.map((post) => {
          return {
            ats_json: post.ats_json as any,
            public_job_id: post.public_job_id,
            recruiter_id: recruiter.id,
            ats_job_id: post.ats_job_id, //saving job posting id from ashby
            ats: 'greenhouse',
          };
        });

        await supabase.from('job_reference').insert(astJobsObj).select();
        handleGenerateJd(newJobs[0].id);
        //creating candidates and job_applications
        await createJobApplications(jobsObj, allIntegrations?.greenhouse_key);
        await handleJobsRefresh();
        //closing modal once done
        setIntegration((prev) => ({
          ...prev,
          greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.IMPORTING },
        }));
        router.push(ROUTES['/jobs/[id]']({ id: newJobs[0].id }));
      } else {
        toast.error(
          'Import failed. Please try again later or contact support for assistance.',
        );
        posthog.capture('GreenHouse Import Error');
        handleClose();
      }
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
