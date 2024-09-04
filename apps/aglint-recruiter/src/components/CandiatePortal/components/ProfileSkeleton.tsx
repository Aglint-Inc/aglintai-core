import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <Card className='w-full max-w-3xl mx-auto '>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='w-[120px] h-[120px] rounded-md' />
          <Skeleton className='h-6 w-[200px]' />
        </div>
        <Skeleton className='h-10 w-[100px]' />
      </CardHeader>
      <CardContent className='space-y-4'>
        {[...Array(4)].map((_, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <Skeleton className='h-5 w-5 rounded-md' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
