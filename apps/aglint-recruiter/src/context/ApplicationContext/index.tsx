import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from 'react';

import { Body } from '@/src/components/JobNewApplications/ui/candidateDrawer/body';
import { Details } from '@/src/components/JobNewApplications/ui/candidateDrawer/details';
import { Overview } from '@/src/components/JobNewApplications/ui/candidateDrawer/details/insights/overview';
import { ResumePreviewer } from '@/src/components/JobNewApplications/ui/resumePreviewer';
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
  Parameters<(typeof applicationQuery)['application']>[0]
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
        slotBookmark={<></>}
        onClose={() => resetPreview()}
        url={value?.meta?.data?.file_url}
      />
      {children ?? <></>}
    </ApplicationContext.Provider>
  );
};
Application.Body = Body;
Application.Details = Details;
Application.Overview = Overview;

export { Application };
