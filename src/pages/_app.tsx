// eslint-disable-next-line simple-import-sort/imports
import '../../devlink/global.css';
import AppLayout from '@components/AppLayout';
import ErrorBoundary from '@components/Common/ErrorBoundary';
import { DevlinkMainProvider } from '@context/DevlinkContext';
import '@styles/globals.scss';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { AuthProvider } from '../context/AuthContext/AuthContext';
import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
import Theme from '../context/Theme/Theme';

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
                  <AppLayout>
                    {getProvider(<Component {...pageProps} />)}
                  </AppLayout>
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
