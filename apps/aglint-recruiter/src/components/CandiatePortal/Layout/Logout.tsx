'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
export const Logout = () => {
  const { push } = useRouter();
  return (
    <DropdownMenuItem onClick={() => push('/candidate/login')}>
      Logout
    </DropdownMenuItem>
  );
};
