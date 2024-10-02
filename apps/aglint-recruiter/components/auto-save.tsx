'use client';

import { cn } from '@lib/utils';
import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AutoSaveProps {
  onSave: () => Promise<void>;
  saveInterval?: number;
  className?: string;
}

export default function AutoSave({
  onSave,
  saveInterval = 3000,
  className,
}: AutoSaveProps) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSaving(true);
      setShow(true);
      await onSave();
      setSaving(false);
      setLastSaved(new Date());

      // Hide the message after 3 seconds
      setTimeout(() => setShow(false), 3000);
    }, saveInterval);

    return () => clearInterval(interval);
  }, [onSave, saveInterval]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 rounded-lg bg-background/80 p-3 shadow-lg backdrop-blur-sm',
        'transition-all duration-300 ease-in-out',
        show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        className,
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
      {lastSaved && (
        <div className='mt-1 text-xs text-muted-foreground'>
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
