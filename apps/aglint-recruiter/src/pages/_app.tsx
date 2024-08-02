// eslint-disable-next-line simple-import-sort/imports
import '@styles/globals.scss';
import { DevlinkMainProvider } from '@context/DevlinkContext';
import PropTypes from 'prop-types';
import 'regenerator-runtime/runtime';

import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
// import { SupportProvider } from '../context/SupportContext/SupportContext';
import Providers from '../context/Providers';
import Theme from '../context/Theme/Theme';
import { QueryProvider } from '../queries';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }) => {
  const provider =
    Component?.privateProvider ?? Component?.publicProvider ?? ((page) => page);

    useEffect(() => {
      console.log('Checking if font is loaded');
      // Function to check if the font is loaded
      const checkFontLoaded = () => {
        console.log('checkFontLoaded');
        document.fonts.load('1em "Material Symbols Rounded"').then((fonts) => {
          if (fonts.length > 0) {
            // Remove the icons-hidden class to show the icons
            document.body.classList.remove('icons-hidden');
          } else {
            console.error('Font loading failed or no fonts loaded.');
          }
        }).catch((error) => {
          console.error('Font loading failed:', error);
        });
      };
  
      checkFontLoaded();
    }, []);

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
