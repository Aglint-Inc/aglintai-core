'use client';
import { DropdownMenuItem } from '@components/shadcn/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
export const Logout = () => {
  const { push } = useRouter();
  return (
    <DropdownMenuItem onClick={() => push('/candidate/login')}>
      Logout
    </DropdownMenuItem>
  );
};
