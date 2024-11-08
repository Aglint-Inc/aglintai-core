import { type SeedClient } from '@snaplet/seed';

export const IDENTITIES = [
  {
    provider_id: 'ef06c40b-8085-47da-ab20-3e805e4a9414',
    user_id: 'ef06c40b-8085-47da-ab20-3e805e4a9414',
    identity_data: {
      sub: 'ef06c40b-8085-47da-ab20-3e805e4a9414',
      email: 'chinmai@aglinthq.com',
      email_verified: false,
      phone_verified: false,
    },
    provider: 'email',
    last_sign_in_at: new Date('2024-11-08T06:51:12.193306Z'),
    created_at: new Date('2024-11-08T06:51:12.193363Z'),
    updated_at: new Date('2024-11-08T06:51:12.193363Z'),
    id: '891b446b-34c1-4bd3-bab9-a1522f58e066',
  },
] satisfies Parameters<SeedClient['identities']>[0];
