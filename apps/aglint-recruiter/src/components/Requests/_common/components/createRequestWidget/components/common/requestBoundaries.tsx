import { type PropsWithChildren, type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { RequestLayout } from './requestLayout';

type Props = {
  errorFallback?: ReactNode;
  suspenseFallback?: ReactNode;
};

export const RequestBoundaries = ({
  children = <></>,
  errorFallback = <>Oops, something went wrong</>,
  suspenseFallback = <>Loading...</>,
}: PropsWithChildren<Props>) => {
  return (
    <ErrorBoundary fallback={<RequestLayout>{errorFallback}</RequestLayout>}>
      <Suspense fallback={<RequestLayout>{suspenseFallback}</RequestLayout>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
