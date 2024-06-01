import { DatabaseEnums } from '@aglint/shared-types';

import ROUTES from './routes';

type Permissions = {
  // eslint-disable-next-line no-unused-vars
  [id in keyof typeof ROUTES]: DatabaseEnums['permissions_type'] | null;
};

const DEFAULT: Permissions = Object.assign(
  {},
  ...Object.keys(ROUTES).map((route) => ({ [route]: null }) as Permissions),
);

const PERMISSIONS: Permissions = {
  ...DEFAULT,
};

export default PERMISSIONS;
