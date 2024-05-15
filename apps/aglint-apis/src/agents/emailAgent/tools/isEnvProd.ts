import {envConfig} from '../../../config';

export const isEnvProd = () => {
  return envConfig.CLIENT_APP_URL.includes('app.aglinthq.com');
};
