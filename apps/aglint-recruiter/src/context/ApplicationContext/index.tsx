import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';

import { ResumePreviewer } from '@/src/components/Jobs/Job/Candidate-List/Common/resumePreviewer';
import { Body } from '@/src/components/Jobs/Job/Common/candidateDrawer/body';
import { Details } from '@/src/components/Jobs/Job/Common/candidateDrawer/details';
import { Overview } from '@/src/components/Jobs/Job/Common/candidateDrawer/details/insights/overview';
import { applicationQuery } from '@/src/queries/application';

import { useApplicationContext } from './hooks';
import { useApplicationStore } from './store';

const ApplicationContext =
  createContext<ReturnType<typeof useApplicationContext>>(undefined);

export const useApplication = () => {
  const value = useContext(ApplicationContext);
  if (value === undefined) throw new Error('ApplicationProvider not found');
  return value;
};

const Application = ({
  children,
  ...props
}: PropsWithChildren<
  Parameters<(typeof applicationQuery)['application']>[0] &
    Partial<
      Pick<Parameters<typeof ResumePreviewer>[0], 'handleDown' | 'handleUp'>
    >
>) => {
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
        handleDown={props?.handleDown}
        handleUp={props?.handleUp}
      />
      {children ?? <></>}
    </ApplicationContext.Provider>
  );
};
Application.Body = Body;
Application.Details = Details;
Application.Overview = Overview;

export { Application };
