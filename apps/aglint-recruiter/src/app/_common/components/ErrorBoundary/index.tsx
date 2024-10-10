'use client';

import { TriangleAlert } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

export const ErrorBoundary = (props: PropsWithChildren) => {
  return (
    <ReactErrorBoundary fallbackRender={fallbackRender}>
      {props.children}
    </ReactErrorBoundary>
  );
};

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const fallbackRender = (props: Props) => {
  return (
    <div className='flex h-[40vh] w-full flex-col items-center justify-center gap-3'>
      <TriangleAlert className='h-10 w-10 text-red-600' strokeWidth={1} />
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-lg font-medium'> Something went wrong. </div>
        <div className='text-sm text-gray-500'>{props.error.message}</div>
      </div>
    </div>
  );
};
