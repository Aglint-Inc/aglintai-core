import { Stack } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import React from 'react';

import ApplicationsDashboard from '@/src/components/JobNewApplications/index';
import {
  ApplicationProvider,
  useApplications,
} from '@/src/context/ApplicationsContext';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const TestPage = () => {
  const {
    qualifiedApplications: {
      data,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
      status,
    },
  } = useApplications();
  const allRows = data ? data.pages.flatMap((d) => d) : [];
  const parentRef = React.useRef();
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });
  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);
  return (
    <>
      {status === 'pending' ? (
        <>Loading...</>
      ) : status === 'error' ? (
        <>Error</>
      ) : (
        <Stack
          ref={parentRef}
          style={{
            height: `100%`,
            width: `100%`,
            overflow: 'auto',
          }}
        >
          <Stack
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const application = allRows[virtualRow.index];
              return (
                <Stack
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <>
                    {isLoaderRow ? (
                      hasNextPage ? (
                        'Loading more...'
                      ) : (
                        'Nothing more to load'
                      )
                    ) : (
                      <Stack gap={2}>
                        <>{application.index + 1}</>
                        <> {application.id}</>
                      </Stack>
                    )}
                  </>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      )}
    </>
  );
};

const TesPage = () => {
  return <ApplicationsDashboard />;
};

TesPage.privateProvider = (page) => {
  return (
    <JobDashboardProvider>
      <ApplicationProvider>
        <JobInterviewPlanProvider>
          <JobApplicationProvider>{page}</JobApplicationProvider>
        </JobInterviewPlanProvider>
      </ApplicationProvider>
    </JobDashboardProvider>
  );
};

export default TesPage;

//   return (
//     <>
//       {status === 'pending' ? (
//         <>Loading...</>
//       ) : status === 'error' ? (
//         <>Error</>
//       ) : (
//         <Stack
//           ref={parentRef}
//           style={{
//             height: `100%`,
//             width: `100%`,
//             overflow: 'auto',
//           }}
//         >
//           <Stack
//             style={{
//               height: `${rowVirtualizer.getTotalSize()}px`,
//               width: '100%',
//               position: 'relative',
//             }}
//           >
//             {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//               const isLoaderRow = virtualRow.index > allRows.length - 1;
//               const application = allRows[virtualRow.index];
//               return (
//                 <Stack
//                   key={virtualRow.index}
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: `${virtualRow.size}px`,
//                     transform: `translateY(${virtualRow.start}px)`,
//                   }}
//                 >
//                   <>
//                     {isLoaderRow ? (
//                       hasNextPage ? (
//                         'Loading more...'
//                       ) : (
//                         'Nothing more to load'
//                       )
//                     ) : (
//                       <Stack gap={2}>
//                         <>{application.index + 1}</>
//                         <> {application.id}</>
//                       </Stack>
//                     )}
//                   </>
//                 </Stack>
//               );
//             })}
//           </Stack>
//         </Stack>
//       )}
//     </>
//   );
