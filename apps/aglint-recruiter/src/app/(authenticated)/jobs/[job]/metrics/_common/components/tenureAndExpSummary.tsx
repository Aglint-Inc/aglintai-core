import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { type FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import UISectionCard from '@/components/Common/UISectionCard';
import { useMetricsExperienceAndTenure } from '@/job/hooks';

export const TenureAndExpSummary: FC = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loader />}>
        <Content />
      </Suspense>
    </ErrorBoundary>
  );
};

const Error = () => (
  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    <Card>
      <CardContent className='pt-6'>
        <p className='text-center text-red-500'>Error loading data</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className='pt-6'>
        <p className='text-center text-red-500'>Error loading data</p>
      </CardContent>
    </Card>
  </div>
);

const Loader = () => (
  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    <Skeleton className='h-[200px] w-full' />
    <Skeleton className='h-[200px] w-full' />
  </div>
);

const Content = () => {
  const [data] = useMetricsExperienceAndTenure();
  if (!data) {
    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <NoDataCard title='Average Tenure' />
        <NoDataCard title='Average Experience' />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <Tenure average_tenure={data.average_tenure} />
      <Experience average_experience={data.average_experience} />
    </div>
  );
};

const Tenure: FC<{ average_tenure: number }> = ({ average_tenure }) => {
  const years = (average_tenure / 12).toFixed(1);
  return (
    <UISectionCard title='Average Tenure'>
      <div className='text-2xl font-bold'>Years {years}</div>
      <p className='text-xs text-muted-foreground'>
        Average time before switching companies.
      </p>
    </UISectionCard>
  );
};

const Experience: FC<{ average_experience: number }> = ({
  average_experience,
}) => {
  const years = (average_experience / 12).toFixed(1);
  return (
    <UISectionCard title='Average Experience'>
      <div className='text-2xl font-bold'>Years {years}</div>
      <p className='text-xs text-muted-foreground'>
        Average of total full time experience of the candidates.
      </p>
    </UISectionCard>
  );
};

const NoDataCard: FC<{ title: string }> = ({ title }) => (
  <Card>
    <CardHeader>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-center text-muted-foreground'>No data available</p>
    </CardContent>
  </Card>
);
