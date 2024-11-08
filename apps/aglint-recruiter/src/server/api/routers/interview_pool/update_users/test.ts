import { expect } from '@playwright/test';
import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('update users', async ({ api, log, adminDb }) => {
  log('Updating users in the pool');
  const pools = await api.interview_pool.get_all();

  const selectedPool = pools.sort(
    (a, b) => a.members.length - b.members.length,
  )[0];

  log(selectedPool.members.length, 'selected pool members');

  if (selectedPool) {
    const poolWithUsers = await api.interview_pool.module_and_users({
      module_id: selectedPool.id,
    });

    if (!poolWithUsers) {
      log('No users found');
      return;
    }

    const allMembers = await api.scheduling.get_members({
      includeSupended: false,
      isCalendar: true,
    });

    const selectedUsers = allMembers
      .filter(
        (user) =>
          poolWithUsers?.relations?.findIndex(
            (rel) => rel.user_id === user.user_id,
          ) === -1,
      )
      .map((user) => ({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        position: user.position,
        user_id: user.user_id,
        profile_image: user.profile_image,
      }))
      .slice(0, 2);

    const res = await api.interview_pool.add_users({
      pool: {
        id: selectedPool.id,
        noReverseShadow: selectedPool.settings?.noReverseShadow || 2,
        noShadow: selectedPool.settings?.noShadow || 2,
      },
      relations: poolWithUsers.relations,
      trainingStatus: 'qualified',
      selectedUsers,
    });

    const fetchDbUsers = (
      await adminDb
        .from('interview_module_relation')
        .select('*,recruiter_user(*)')
        .eq('module_id', selectedPool.id)
        .throwOnError()
    ).data!;

    const isUsersAdded = selectedUsers.every(
      (user) =>
        fetchDbUsers.findIndex((dbUser) => dbUser.user_id === user.user_id) !==
        -1,
    );

    expect(res.success && isUsersAdded).toBeTruthy();

    const addedRelations = fetchDbUsers.filter(
      (rel) =>
        selectedUsers.findIndex((user) => user.user_id === rel.user_id) !== -1,
    );

    adminDb
      .from('interview_module_relation')
      .delete()
      .in(
        'id',
        addedRelations.map((rel) => rel.id),
      );
  } else {
    log('No pool found');
  }

  log('Users updated');
});
