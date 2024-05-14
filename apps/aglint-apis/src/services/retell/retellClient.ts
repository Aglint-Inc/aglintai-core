import {RetellClient} from 'retell-sdk';

import {envConfig} from '../../config';

export const retellClient = new RetellClient({
  apiKey: envConfig.RETELL_API_KEY ?? '',
});
