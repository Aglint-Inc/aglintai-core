import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';

import { ResumePreviewer } from '@/src/components/Jobs/Job/Candidate-List/Common/ResumePreviewer';
import { Body } from '@/src/components/Jobs/Job/Common/CandidateDrawer/Body';
import { Details } from '@/src/components/Jobs/Job/Common/CandidateDrawer/Details';
import { Overview } from '@/src/components/Jobs/Job/Common/CandidateDrawer/Details/Insights/Overview';

import { useApplicationContext } from './hooks';
import { useApplicationStore } from './store';

type UseContextType = typeof useApplicationContext;

const ApplicationContext = createContext<ReturnType<UseContextType>>(undefined);

export const useApplication = () => {
  const value = useContext(ApplicationContext);
  if (value === undefined) throw new Error('ApplicationProvider not found');
  return value;
};

const Application = ({
  children,
  ...props
}: PropsWithChildren<Parameters<UseContextType>[0]>) => {
  const value = useApplicationContext(props);
  const { preview, resetPreview, resetAll } = useApplicationStore(
    ({ preview, resetPreview, resetAll }) => ({
      preview,
      resetPreview,
      resetAll,
    }),
  );
  useEffect(() => {
    return () => resetAll();
  }, []);
  return (
    <ApplicationContext.Provider value={value}>
      <ResumePreviewer
        id={value?.application_id}
        name={value?.meta?.data?.name}
        open={preview}
        onClose={() => resetPreview()}
        url={value?.meta?.data?.file_url}
        navigation={props?.showResumePreviewActions && props?.navigation}
        bookmark={
          props?.showResumePreviewActions && {
            isBookmarked: value?.meta?.data?.bookmarked,
            handleBookmark: () =>
              value?.handleUpdateApplication({
                bookmarked: !value?.meta?.data?.bookmarked,
              }),
          }
        }
        download={value?.meta?.data?.resume_processing_state === 'unparsable'}
      />
      {children ?? <></>}
    </ApplicationContext.Provider>
  );
};
Application.Body = Body;
Application.Details = Details;
Application.Overview = Overview;

export { Application };
