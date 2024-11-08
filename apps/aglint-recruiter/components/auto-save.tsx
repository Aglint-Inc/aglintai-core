'use client';

import { cn } from '@lib/utils';
import { Check, Loader2 } from 'lucide-react';
interface AutoSaveProps {
  show: boolean;
  saving: boolean;
  className?: string;
}

export default function AutoSave({ saving, show, className }: AutoSaveProps) {
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 rounded-lg bg-background/80 p-3 shadow-lg backdrop-blur-sm',
        'z-50 transition-all duration-300 ease-in-out',
        show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        className,
        'bg-muted-foreground/10 dark:bg-muted-foreground/20',
      )}
    >
      <div className='flex items-center space-x-2 text-sm'>
        {saving ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin text-primary' />
            <span className='text-muted-foreground'>Saving changes...</span>
          </>
        ) : (
          <>
            <Check className='h-4 w-4 text-green-500' />
            <span className='text-muted-foreground'>Changes saved</span>
          </>
        )}
      </div>
    </div>
  );
}
