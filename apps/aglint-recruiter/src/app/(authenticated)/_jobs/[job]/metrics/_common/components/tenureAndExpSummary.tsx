import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { type FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
    <MetricCard
      title='Average Tenure'
      value={years}
      unit='Years'
      description='Average time before switching companies.'
    />
  );
};

const Experience: FC<{ average_experience: number }> = ({
  average_experience,
}) => {
  const years = (average_experience / 12).toFixed(1);
  return (
    <MetricCard
      title='Average Experience'
      value={years}
      unit='Years'
      description='Average of total full time experience of the candidates'
    />
  );
};

const MetricCard: FC<{
  title: string;
  value: string;
  unit: string;
  description: string;
}> = ({ title, value, unit, description }) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>
        {value} {unit}
      </div>
      <p className='text-xs text-muted-foreground'>{description}</p>
    </CardContent>
  </Card>
);

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
