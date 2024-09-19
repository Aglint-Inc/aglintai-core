import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface ReportCardProps {
  title: string;
  headerSlot?: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: string | null;
  className?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  headerSlot,
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
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {headerSlot && (
          <div className='text-muted-foreground'>{headerSlot}</div>
        )}
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ReportCard;
