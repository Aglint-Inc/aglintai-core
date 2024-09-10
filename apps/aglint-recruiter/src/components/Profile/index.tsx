import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { PasswordUpdate } from './components/PasswordUpdate';
import { UserDetail } from './components/UserDetails';

const navTabs: Array<{
  label: string;
  route: string;
  roles?: (Permissions | 'authorized')[];
}> = [
  { label: 'Your Details', route: 'user_detail' },
  { label: 'Password Update', route: 'password_update' },
];

const ProfileDashboard = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const router = useRouter();
  const [currTab, setCurrTab] = useState('user_detail');

  useEffect(() => {
    if (router.query?.tab) setCurrTab(router.query?.tab as string);
  }, [router.query?.tab]);

  return (
    <div className='p-4'>
      <Tabs
        value={currTab}
        onValueChange={(value) => {
          router.push({ query: { ...router.query, tab: value } });
        }}
      >
        <TabsList>
          {navTabs
            .filter((item) =>
              item.roles ? checkPermissions(item.roles as any) : true,
            )
            .map((item) => (
              <TabsTrigger key={item.route} value={item.route}>
                {item.label}
              </TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value='user_detail'>
          <UserDetail />
        </TabsContent>
        <TabsContent value='password_update'>
          <PasswordUpdate />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDashboard;
