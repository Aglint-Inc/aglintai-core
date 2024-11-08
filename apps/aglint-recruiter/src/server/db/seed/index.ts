/**
 * ! Executing this script will delete all data in your database and seed it with 10 wrappers_fdw_stats.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';

import { USERS } from './auth';

const main = async () => {
  const seed = await createSeedClient({
    dryRun: true,
    models: {
      users: {
        data: {
          aud: 'authenticated',
          role: 'authenticated',
          encrypted_password:
            '$2a$10$jzsLbVRGn71QR/I4MLtJ5ejf7oD42O3iackOX3m7b9sdJ5JA73EX.',
          email_confirmed_at: new Date('2024-11-08T06:51:12.197358Z'),
          invited_at: null,
          confirmation_token: '',
          confirmation_sent_at: null,
          recovery_token: '',
          recovery_sent_at: null,
          email_change_token_new: '',
          email_change: '',
          email_change_sent_at: null,
          last_sign_in_at: new Date('2024-11-08T07:09:45.805581Z'),
          raw_app_meta_data: {
            provider: 'email',
            providers: ['email'],
          },
          raw_user_meta_data: {},
          is_super_admin: null,
          created_at: new Date('2024-11-08T06:51:12.191301Z'),
          updated_at: new Date('2024-11-08T07:09:45.80936Z'),
          phone: null,
          phone_confirmed_at: null,
          phone_change: '',
          phone_change_token: '',
          phone_change_sent_at: null,
          email_change_token_current: '',
          email_change_confirm_status: 0,
          banned_until: null,
          reauthentication_token: '',
          reauthentication_sent_at: null,
          is_sso_user: false,
          deleted_at: null,
          is_anonymous: false,
        },
      },
    },
  });

  await seed.$resetDatabase();

  await seed.users(
    USERS.map((user) => ({
      ...user,
      identities: [
        {
          provider_id: user.id,
          identity_data: {
            sub: user.id,
            email_verified: false,
            phone_verified: false,
            email: user.email,
          },
        },
      ],

      recruiter_user: [
        {
          first_name: user.first_name,
          email: user.email,
        },
      ],
    })),
  );

  process.exit();
};

main();
