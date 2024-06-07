import { Drawer as DrawerDev } from '@mui/material';

import { Application } from '@/src/context/ApplicationContext';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';
import { useApplications } from '@/src/context/ApplicationsContext';

const Drawer = () => {
  const { job } = useApplications();
  const {
    drawer: { open, application_id },
    handlClose,
  } = useApplicationStore(({ drawer, handlClose }) => ({
    drawer,
    handlClose,
  }));
  return (
    <DrawerDev open={open} onClose={() => handlClose()} anchor='right'>
      {!!application_id && (
        <Application application_id={application_id} job_id={job?.id}>
          <Application.Body
            topBar={
              <Application.Body.TopBar>
                <Application.Body.TopBar.Info />
                <Application.Body.TopBar.Actions />
              </Application.Body.TopBar>
            }
            meta={<Application.Body.Meta />}
            tabs={<Application.Body.Tabs />}
            content={<Application.Body.Content />}
          />
        </Application>
      )}
    </DrawerDev>
  );
};

export default Drawer;
