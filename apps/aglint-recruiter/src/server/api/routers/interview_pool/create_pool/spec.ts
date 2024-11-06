import test, { expect } from '@playwright/test';
import { caller } from 'playwright/utils/createCaller';

test.describe('interview pool create', () => {
  test('training true', async () => {
    const caller1 = await caller();

    // Create pool with isTraining set to true
    const createPoolTrue = await caller1.interview_pool.create_pool({
      name: 'testTrue',
      description: 'test with isTraining true',
      isTraining: true,
    });
    expect(!!createPoolTrue?.id).toBe(true);
  });

  test('training false', async () => {
    const caller1 = await caller();

    // Create pool with isTraining set to false
    const createPoolFalse = await caller1.interview_pool.create_pool({
      name: 'testFalse',
      description: 'test with isTraining false',
      isTraining: false,
    });
    expect(!!createPoolFalse?.id).toBe(true);
  });

  test('with department_id', async () => {
    const caller1 = await caller();
    const departments = await caller1.tenant.all_departments();

    // Create pool with department_id
    if (departments && departments?.length > 0) {
      const createPoolFalse = await caller1.interview_pool.create_pool({
        name: 'testFalse',
        description: 'test with isTraining false',
        isTraining: false,
        department_id: departments[0].id,
      });

      expect(!!createPoolFalse?.id).toBe(true);
    }
  });
});
