// eslint-disable-next-line simple-import-sort/imports
import '../../devlink/global.css';
import '../../devlink2/global.css';
import AppLayout from '@components/AppLayout';
import ErrorBoundary from '@components/Common/ErrorBoundary';
import { DevlinkMainProvider } from '@context/DevlinkContext';
import '@styles/globals.scss';
import '@styles/toast.scss';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
import Theme from '../context/Theme/Theme';
import { NotificationsContextProvider } from '../context/Notifications';
import JobsProvider from '../context/JobsContext';
import { SupportProvider } from '../context/SupportContext/SupportContext';

const MyApp = ({ Component, pageProps }) => {
  const getProvider = Component.getProvider ?? ((page) => page);
  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <DevlinkMainProvider>
          <Theme>{getProvider(<Component {...pageProps} />)}</Theme>
        </DevlinkMainProvider>
      </>,
    );
  }

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={'Loading'}>
          <DevlinkMainProvider>
            <Theme>
              <ScreenSizeProvider>
                <AuthProvider>
                  <NotificationsContextProvider>
                    <JobsProvider>
                      <SupportProvider>
                        <AppLayout>
                          {getProvider(<Component {...pageProps} />)}
                        </AppLayout>
                      </SupportProvider>
                    </JobsProvider>
                  </NotificationsContextProvider>
                </AuthProvider>
              </ScreenSizeProvider>
            </Theme>
          </DevlinkMainProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

MyApp.propTypes = {
  window: PropTypes.func,
};

export default MyApp;
