import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { WidgetGrid3X3, WidgetJobCard } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { useJobs } from '@/src/context/JobsContext';

function AgentPage() {
  const router = useRouter();
  const {
    jobs: { data: jobs }
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
        title='Aglint | Agents'
        description='AI Powered Talent Development Platform.'
      />
      <JobAssistantProvider>
        <Stack
          p={'20px'}
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
            slotWidget={jobs.map((item, i) => {
              return (
                <WidgetJobCard
                  onClickJob={{
                    onClick: () => {
                      router.push(`/agent/jobs/${item.id}`);
                    }
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
