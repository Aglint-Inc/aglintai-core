import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure(
  'interview pool create isTraining set to true',
  async ({ api }) => {
    const createPoolTrue = await api.interview_pool.create_pool({
      name: 'testTrue',
      description: 'test with isTraining true',
      isTraining: true,
    });
    expect(!!createPoolTrue?.id).toBe(true);
  },
);

privateTestProcedure(
  'interview pool create isTraining set to false',
  async ({ api }) => {
    const createPoolFalse = await api.interview_pool.create_pool({
      name: 'testFalse',
      description: 'test with isTraining false',
      isTraining: false,
    });
    expect(!!createPoolFalse?.id).toBe(true);
  },
);

privateTestProcedure(
  'interview pool create with department_id',
  async ({ api }) => {
    const departments = await api.tenant.all_departments();

    if (departments && departments?.length > 0) {
      const createPoolFalse = await api.interview_pool.create_pool({
        name: 'testFalse',
        description: 'test with isTraining false',
        isTraining: false,
        department_id: departments[0].id,
      });

      expect(!!createPoolFalse?.id).toBe(true);
    }
  },
);
