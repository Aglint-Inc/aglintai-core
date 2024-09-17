import 'regenerator-runtime/runtime';

import PropTypes from 'prop-types';

import { PrivateProviders, PublicProviders } from '../context/Providers';

const MyApp = ({ Component, pageProps }) => {
  const provider =
    Component?.privateProvider ?? Component?.publicProvider ?? ((page) => page);


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
