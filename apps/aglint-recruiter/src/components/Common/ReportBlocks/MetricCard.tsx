import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface MetricCardProps {
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | null;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  children,
  isLoading = false,
  isEmpty = false,
  error = null,
  className,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='space-y-2'>
          <Skeleton className='h-10 w-[80%]' />
          <Skeleton className='h-4 w-[60%]' />
        </div>
      );
    }

    if (error) {
      return (
        <div className='flex h-[100px] items-center justify-center text-red-500'>
          <AlertTriangle className='mr-2 h-5 w-5' />
          <span>{error}</span>
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className='flex h-[100px] items-center justify-center text-muted-foreground'>
          No data available
        </div>
      );
    }

    return children;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className='pt-6'>{renderContent()}</CardContent>
    </Card>
  );
};

export default MetricCard;
