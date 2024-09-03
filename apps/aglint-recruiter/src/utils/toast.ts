import { toast as shadcnToast } from '@/components/hooks/use-toast';

const toast = {
  error: (message: string) => shadcnToast({ variant: 'destructive', title: message, duration: 3000 }),
  success: (message: string) => shadcnToast({ variant: 'default', title: message, duration: 3000 }),
  warning: (message: string) => shadcnToast({ title: message, duration: 3000 }),
  message: (message: string) => shadcnToast({ variant: 'default', title: message, duration: 3000 }),
};

export default toast;
