'use client';
import { useRouter } from 'next/navigation';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
export const Logout = () => {
  const { push } = useRouter();
  return (
    <DropdownMenuItem onClick={() => push('/candidate/login')}>
      Logout
    </DropdownMenuItem>
  );
};
