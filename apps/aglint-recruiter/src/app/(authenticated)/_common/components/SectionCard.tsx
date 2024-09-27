import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import React, { useState } from 'react';

import UITypography from '@/components/Common/UITypography';

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  topAction?: React.ReactNode;
  bottomAction?: React.ReactNode;
  isTopActionStick?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  isTopActionStick = false,
  children,
  topAction,
  bottomAction,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Card
      className='mb-6'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 p-4'>
        <CardTitle className='flex min-h-[40px] w-full justify-between'>
          <div>
            <UITypography className='text-lg font-medium'>{title}</UITypography>
            {description && (
              <UITypography className='text-base font-normal text-muted-foreground'>
                {description}
              </UITypography>
            )}
          </div>
          {(isHover || isTopActionStick) && topAction}
        </CardTitle>
        {}
      </CardHeader>
      <CardContent className='p-4 pt-0'>{children}</CardContent>
      {bottomAction && (
        <CardFooter className='h-[40px]'>{isHover ? 'footer' : ''}</CardFooter>
      )}
    </Card>
  );
};
