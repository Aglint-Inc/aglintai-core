// eslint-disable-next-line simple-import-sort/imports
import AppLayout from '@components/AppLayout';
import ErrorBoundary from '@components/Common/ErrorBoundary';
import { DevlinkMainProvider } from '@context/DevlinkContext';
import '@styles/globals.scss';
import '@styles/toast.scss';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import 'regenerator-runtime/runtime';
import '../../devlink/global.css';
import '../../devlink2/global.css';
import '../../devlink3/global.css';
import { PHProvider } from '../components/PostHog/postHog';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import JobsProvider from '../context/JobsContext';
import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
// import { SupportProvider } from '../context/SupportContext/SupportContext';
import Theme from '../context/Theme/Theme';
import { QueryProvider } from '../queries';

const MyApp = ({ Component, pageProps }) => {
  const provider =
    Component?.privateProvider ?? Component?.publicProvider ?? ((page) => page);

  if (Component?.publicProvider) {
    return (
      <>
        <PHProvider>
          <DevlinkMainProvider>
            <Theme>
              <QueryProvider>
                {provider(<Component {...pageProps} />)}
              </QueryProvider>
            </Theme>
          </DevlinkMainProvider>
        </PHProvider>
      </>
    );
  }

  return (
    <>
      <PHProvider>
        <ErrorBoundary>
          <Suspense fallback={'Loading'}>
            <DevlinkMainProvider>
              <Theme>
                <ScreenSizeProvider>
                  <AuthProvider>
                    <QueryProvider>
                      <JobsProvider>
                        {/* <SupportProvider> */}
                        <AppLayout>
                          {provider(<Component {...pageProps} />)}
                        </AppLayout>
                        {/* </SupportProvider> */}
                      </JobsProvider>
                    </QueryProvider>
                  </AuthProvider>
                </ScreenSizeProvider>
              </Theme>
            </DevlinkMainProvider>
          </Suspense>
        </ErrorBoundary>
      </PHProvider>
    </>
  );
};

MyApp.propTypes = {
  window: PropTypes.func,
};

export default MyApp;
