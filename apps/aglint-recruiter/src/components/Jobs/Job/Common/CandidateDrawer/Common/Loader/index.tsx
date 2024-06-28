import { type PropsWithChildren, memo } from 'react';

export const Loader = memo(
  ({ children, count }: PropsWithChildren<{ count: number }>) => {
    return (
      <>
        {[...Array(Math.trunc(Math.random() * (count - 1)) + 1)].map(
          () => children,
        )}
      </>
    );
  },
);
Loader.displayName = 'Loader';
