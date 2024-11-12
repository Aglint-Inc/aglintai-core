import { expect } from '@playwright/test';
import { testData } from 'playwright/utils/testData/request';
import { privateTestProcedure } from 'playwright/utils/trpc';

// TODO: Add more test cases
privateTestProcedure(
  'test case 1: Add new request',
  async ({ api, db, recruiter_id, log }) => {
    log('Start requests.create.create_request');
    const { create_request } = await testData({
      db,
      recruiter_id,
    });

    const requestId = await api.requests.create.create_request({
      ...create_request,
    });

    const { data: request } = await db
      .from('request')
      .select('id')
      .eq('id', requestId)
      .single()
      .throwOnError();
    if (!request) throw new Error('No request found');
    expect(request.id).toBe(requestId);

    log('End requests.create.create_request');
  },
);
