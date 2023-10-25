import { Avatar, Dialog, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  AtsCard,
  JobDashboardEmpty,
  LoadingJobsAts,
  NoResultAts,
  SkeletonLoaderAtsCard,
} from '@/devlink';
import { AtsJobs } from '@/devlink/AtsJobs';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { StatusJobs } from '@/src/types/data.types';
import { ScrollList } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import LoaderLever from './Loader';
import { createJobApplications, getLeverStatusColor, POSTED_BY } from './utils';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  return (
    <>
      <JobDashboardEmpty
        isAtsOptionVisible={false}
        slotAts={<LeverPosting />}
        textHeader={heading}
        isOldTitleVisible={showMsg}
        onClickAddJob={{
          onClick: handleClickAddJob,
        }}
        isSelectTitleVisible={true}
        onClickRequestIntegration={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                'Aglint : Request ATS Integration',
              )}&body=${encodeURIComponent(
                ` 
Hello,

I would like to request an integration.

Thank you,
[Your Name]
`,
              )}`,
            );
          },
        }}
        onClickGreenHouse={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Request Integration with Greenhouse`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Greenhouse into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
        onClickAshby={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Aglint: Request Integration with Ashby`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Ashby into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
        onClickLever={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Request Integration with Lever`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Lever into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
      />
    </>
  );
}

export function LeverPosting() {
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  const { handleUIJobUpdate, handleApplicationsRead, jobsData } = useJobs();
  const [leverPostings, setLeverPostings] = useState([]);
  const [selectedLeverPostings, setSelectedLeverPostings] = useState([]);
  const [leverFilter, setLeverFilter] = useState('published');
  const [initialFetch, setInitialFetch] = useState(true);
  const [savingToDb, setSavingToDb] = useState(false);

  const fetchAllJobs = async () => {
    let allJobs = [];
    let hasMore = true;
    let next = 0;

    while (hasMore) {
      try {
        const response = await axios.post('/api/lever/getPostings', {
          offset: next,
        });

        if (response.data && response.data.data) {
          allJobs = allJobs.concat(response.data.data);
          hasMore = response.data.hasNext;
        } else {
          next = response.data.next;
          hasMore = false; // Exit the loop if there are no more records
        }
      } catch (error) {
        hasMore = false; // Exit the loop in case of an error
      }
    }
    return allJobs;
  };

  useEffect(() => {
    if (jobsData.jobs) {
      fetchJobs();
    }
  }, [jobsData.jobs]);

  const fetchJobs = async () => {
    const allJobs = await fetchAllJobs();
    setLeverPostings(
      allJobs.filter((post) => {
        if (jobsData.jobs?.filter((job) => job.id === post.id).length == 0) {
          return true;
        } else {
          return false;
        }
      }),
    );
    setInitialFetch(false);
  };

  const createJobObject = async () => {
    const dbJobs = selectedLeverPostings.map((post) => {
      return {
        location: post.categories.location,
        job_title: post.text,
        description: post.content.descriptionHtml,
        email_template: recruiter.email_template,
        department: post.categories.department || '',
        recruiter_id: recruiter.id,
        posted_by: POSTED_BY.LEVER,
        job_type:
          post.categories.commitment === 'Part Time'
            ? 'parttime'
            : post.categories.commitment === 'Internship'
            ? 'internship'
            : 'fulltime',
        workplace_type:
          post.workplaceType === 'hybrid'
            ? 'hybrid'
            : post.workplaceType === 'onsite'
            ? 'onsite'
            : 'offsite',
        company: recruiter.name,
        skills: [],
        active_status: {
          closed: {
            isActive: false,
            timeStamp: null,
          },
          sourcing: {
            isActive: false,
            timeStamp: null,
          },
          interviewing: {
            isActive: true,
            timeStamp: null,
          },
        },
      };
    });
    return dbJobs;
  };

  console.log(selectedLeverPostings);

  const importLever = async () => {
    try {
      setSavingToDb(true);
      const dbJobs = await createJobObject();

      const { data: newJobs, error } = await supabase
        .from('public_jobs')
        .insert(dbJobs)
        .select();

      if (!error) {
        const jobsObj = selectedLeverPostings.map((post) => {
          return {
            ...post,
            job_id: newJobs.filter(
              (job) =>
                job.job_title == post.text &&
                job.location == post.categories.location,
            )[0].id,
          };
        });

        await createJobApplications(jobsObj);
        newJobs.map((job) => {
          handleUIJobUpdate({
            ...job,
            active_status: job.active_status as unknown as StatusJobs,
          });
        });
        const oldJobsIds = jobsData.jobs.map((job) => job.id);
        const newJobsIds = newJobs.map((job) => job.id);
        handleApplicationsRead([...oldJobsIds, ...newJobsIds]);
        setSavingToDb(false);
        toast.success('Jobs Imported Successfully');
        router.push(`${pageRoutes.JOBS}?status=active`);
      } else {
        toast.error(
          'Sorry unable to import. Please try again later or contact support.',
        );
        setSavingToDb(false);
      }
    } catch (error) {
      toast.error(
        'Sorry unable to import. Please try again later or contact support.',
      );
      setSavingToDb(false);
    }
  };

  const handleClose = () => {
    //
  };

  return (
    <>
      <Dialog open={savingToDb} onClose={handleClose}>
        <LoadingJobsAts
          textAtsCompany={'Lever'}
          textJobCount={
            selectedLeverPostings.length < 1
              ? `${selectedLeverPostings.length} Job`
              : `${selectedLeverPostings.length} Jobs`
          }
          slotLottie={<LoaderLever />}
        />
      </Dialog>

      <AtsJobs
        slotLogo={
          <Avatar
            variant='square'
            src='/images/ats/lever.png'
            sx={{ width: '100%', height: '30px' }}
          />
        }
        textNumberofJobs={
          <Typography variant='body2'>
            {selectedLeverPostings.length == 0
              ? `Showing ${leverPostings.length} Jobs from lever`
              : `${selectedLeverPostings.length} Jobs selected`}
          </Typography>
        }
        onClickImport={{
          onClick: () => {
            importLever();
          },
        }}
        isImportDisable={selectedLeverPostings.length === 0}
        isAllActive={leverFilter == 'all'}
        isClosedActive={leverFilter == 'closed'}
        isInternalActive={leverFilter == 'internal'}
        isPublishedActive={leverFilter == 'published'}
        onClickClosed={{
          onClick: () => {
            setLeverFilter('closed');
          },
        }}
        onClickPublished={{
          onClick: () => {
            setLeverFilter('published');
          },
        }}
        onClickInternal={{
          onClick: () => {
            setLeverFilter('internal');
          },
        }}
        onClickAll={{
          onClick: () => {
            setLeverFilter('all');
          },
        }}
        slotAtsCard={
          !initialFetch ? (
            leverPostings.filter((job) => {
              if (leverFilter !== 'all') {
                return job.state === leverFilter;
              } else {
                return true;
              }
            }).length > 0 ? (
              leverPostings
                .filter((job) => {
                  if (leverFilter !== 'all') {
                    return job.state === leverFilter;
                  } else {
                    return true;
                  }
                })
                .map((post, ind) => {
                  return (
                    <ScrollList uniqueKey={ind} key={ind}>
                      <AtsCard
                        isChecked={
                          selectedLeverPostings?.filter((p) => p.id === post.id)
                            ?.length > 0
                        }
                        onClickCheck={{
                          onClick: () => {
                            if (
                              selectedLeverPostings?.some(
                                (p) => p.id === post.id,
                              )
                            ) {
                              // If the object is already in the array, remove it
                              setSelectedLeverPostings((prev) =>
                                prev.filter((p) => p.id !== post.id),
                              );
                            } else {
                              // If the object is not in the array, add it
                              setSelectedLeverPostings((prev) => [
                                ...prev,
                                post,
                              ]);
                            }
                          },
                        }}
                        propsTextColor={{
                          style: {
                            color: getLeverStatusColor(post.state),
                          },
                        }}
                        textRole={post.text}
                        textStatus={post.state}
                        textWorktypeLocation={post.categories.location}
                      />
                    </ScrollList>
                  );
                })
            ) : (
              <NoResultAts />
            )
          ) : (
            <>
              <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
              <SkeletonLoaderAtsCard /> <SkeletonLoaderAtsCard />
            </>
          )
        }
      />
    </>
  );
}
