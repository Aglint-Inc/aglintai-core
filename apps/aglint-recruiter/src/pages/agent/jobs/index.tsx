import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WidgetGrid3X3 } from '@/devlink3/WidgetGrid3X3';
import { WidgetJobCard } from '@/devlink3/WidgetJobCard';
import Loader from '@/src/components/Common/Loader';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { useJobs } from '@/src/context/JobsContext';

function AgentPage() {
  const router = useRouter();
  const {
    jobs: { data: jobs },
  } = useJobs();
  const [loading, setLoading] = useState(true);
  async function getjobs() {
    setLoading(false);
    // setJObs(jobList);
  }

  useEffect(() => {
    getjobs();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Seo
        title='Job Assissant | Aglint AI'
        description='AI for People Products'
      />
      <JobAssistantProvider>
        <Stack
          p={'var(--space-5)'}
          mt={10}
          height={'100%'}
          width={'100%'}
          alignItems={'center'}
          maxWidth={900}
          gap={2}
        >
          <Stack width={'100%'}>
            <WidgetGrid3X3 slotWidget={<Typography>Select a job</Typography>} />
          </Stack>
          <WidgetGrid3X3
            slotWidget={jobs
              .filter((item) => item.status === 'published')
              .map((item, i) => {
                return (
                  <WidgetJobCard
                    onClickJob={{
                      onClick: () => {
                        router.push(`/agent/jobs/${item.id}`);
                      },
                    }}
                    key={i}
                    textJob={item.job_title}
                    textSecondary={''}
                  />
                );
              })}
          />
        </Stack>
      </JobAssistantProvider>
    </>
  );
}

export default AgentPage;
