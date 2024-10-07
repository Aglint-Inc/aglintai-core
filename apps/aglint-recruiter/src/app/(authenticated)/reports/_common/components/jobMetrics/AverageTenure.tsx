import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Skeleton } from '@components/ui/skeleton';
import { ChartNoAxesColumn } from 'lucide-react';

import { Loader } from '@/common/Loader';

import { useCandidateExp } from '../../hook/job/jobMatrix';

export default function AverageTenure() {
  const { data, isFetching } = useCandidateExp();
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Average Experience</SectionTitle>
        </SectionHeaderText>
      </SectionHeader>
      {isFetching ? (
        <Loader />
      ) : !data?.avg_total_exp ? (
        <EmptyState
          icon={ChartNoAxesColumn}
          header='No data available'
          description='No data available for the selected time frame.'
        />
      ) : (
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='mb-2 text-6xl font-bold'>
            {isFetching ? (
              <Skeleton className='h-[60px] w-[100px]' />
            ) : (
              data.avg_tenure || '-'
            )}
          </div>
          <div className='mb-4 text-2xl font-semibold'>Years</div>
          <p className='text-center text-muted-foreground'>
            Average time before switching companies.
          </p>
        </div>
      )}
    </Section>
  );
}
