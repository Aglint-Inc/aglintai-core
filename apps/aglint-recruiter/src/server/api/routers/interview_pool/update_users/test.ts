import { privateTestProcedure } from 'playwright/utils/trpc';

privateTestProcedure('update users', async ({ api, log }) => {
  log('Updating users in the pool');
  const pools = await api.interview_pool.get_all();

  const selectedPool = pools[0];

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

    log(allMembers);

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

    log(selectedUsers);

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

    log(res);
  } else {
    log('No pool found');
  }

  log('Users updated');
});
