import '@styles/globals.scss';
import 'regenerator-runtime/runtime';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { PrivateProviders, PublicProviders } from '../context/Providers';

const MyApp = ({ Component, pageProps }) => {
  const provider =
    Component?.privateProvider ?? Component?.publicProvider ?? ((page) => page);

  useEffect(() => {
    const checkFontLoaded = () => {
      document.fonts.load('1em "Material Symbols Rounded"').then((fonts) => {
        if (fonts.length > 0) {
          document.body.classList.remove('icons-hidden');
        }
      });
    };

    checkFontLoaded();
  }, []);

  if (Component?.publicProvider) {
    return (
      <PublicProviders>
        {provider(<Component {...pageProps} />)}
      </PublicProviders>
    );
  }

  return (
    <PrivateProviders>
      {provider(<Component {...pageProps} />)}
    </PrivateProviders>
  );
};

MyApp.propTypes = {
  window: PropTypes.func,
};

export default MyApp;
