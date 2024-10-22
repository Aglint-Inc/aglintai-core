import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

export default function UpcomingInterviewSkeleton() {
  return (
    <div>
      <Card className='border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
        <CardHeader className='p-4'>
          <Skeleton className='h-6 w-1/3' />
        </CardHeader>
        <CardContent className='p-4 pt-0'>
          <div className='flex items-center gap-3'>
            <div className='flex w-24 flex-col items-center justify-center rounded-lg bg-muted py-2'>
              <Skeleton className='mb-1 h-4 w-12' />
              <Skeleton className='mb-1 h-8 w-10' />
              <Skeleton className='h-4 w-14' />
            </div>
            <div className='flex flex-grow flex-col gap-2'>
              <Skeleton className='h-5 w-1/2' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-1/4' />
            </div>
          </div>
          <div className='mt-4 flex w-full gap-2'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
