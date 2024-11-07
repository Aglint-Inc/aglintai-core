import { expect } from '@playwright/test';
import { testData } from 'playwright/utils/testData/request';
import { privateTestProcedure } from 'playwright/utils/trpc';

import { type CreateRequest } from './create_request';

// TODO: Add more test cases
privateTestProcedure(
  'test case 1: Add new request',
  async ({ api, db, recruiter_id }) => {
    const { create_request } = await testData({
      db,
      recruiter_id,
    });

    const requests = await api.requests.create.create_request({
      ...create_request,
    });

    expect(requests satisfies CreateRequest['output']).toBeTruthy();

    // eslint-disable-next-line no-console
    console.info('Created request successfully');
  },
);
