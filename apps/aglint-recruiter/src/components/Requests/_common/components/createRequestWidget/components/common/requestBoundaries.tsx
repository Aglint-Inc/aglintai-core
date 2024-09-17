import { type PropsWithChildren, type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { RequestLayout } from './requestLayout';

type Props = {
  errorFallback?: ReactNode;
  suspenseFallback?: ReactNode;
};

export const ErrorFallback = () => (
  <RequestLayout>
    <>Oops, something went wrong</>
  </RequestLayout>
);

export const SuspenseFallback = () => (
  <RequestLayout>
    <>Loading...</>
  </RequestLayout>
);

export const RequestBoundaries = ({
  children = <></>,
  errorFallback = <ErrorFallback />,
  suspenseFallback = <SuspenseFallback />,
}: PropsWithChildren<Props>) => {
  return (
    <ErrorBoundary fallback={<RequestLayout>{errorFallback}</RequestLayout>}>
      <Suspense fallback={<RequestLayout>{suspenseFallback}</RequestLayout>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
