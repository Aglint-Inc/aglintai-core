import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

export const AssementQueryProvider: React.FC<{
  children: React.JSX.Element;
}> = ({ children }) => {
  const DEV = process.env.NEXT_PUBLIC_HOST_NAME.includes('localhost');
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
