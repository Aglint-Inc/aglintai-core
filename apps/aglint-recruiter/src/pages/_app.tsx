// eslint-disable-next-line simple-import-sort/imports
import { DevlinkMainProvider } from '@context/DevlinkContext';
import '@styles/globals.scss';
import PropTypes from 'prop-types';
import 'regenerator-runtime/runtime';

import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
// import { SupportProvider } from '../context/SupportContext/SupportContext';
import Providers from '../context/Providers';
import Theme from '../context/Theme/Theme';
import { QueryProvider } from '../queries';

const MyApp = ({ Component, pageProps }) => {
  const provider =
    Component?.privateProvider ?? Component?.publicProvider ?? ((page) => page);

  if (Component?.publicProvider) {
    return (
      <>
        <DevlinkMainProvider>
          <Theme>
            <ScreenSizeProvider>
              <QueryProvider>
                {provider(<Component {...pageProps} />)}
              </QueryProvider>
            </ScreenSizeProvider>
          </Theme>
        </DevlinkMainProvider>
      </>
    );
  }

  return <Providers>{provider(<Component {...pageProps} />)}</Providers>;
};

MyApp.propTypes = {
  window: PropTypes.func,
};

export default MyApp;
