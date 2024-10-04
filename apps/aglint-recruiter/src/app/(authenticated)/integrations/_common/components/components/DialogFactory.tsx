'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';

export function DialogFactory({
  trigger,
  heading,
  description,
  body,
  footer,
  open,
  setOpen,
}: {
  trigger?: React.ReactNode;
  heading?: string;
  description?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen?: (x: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {Boolean(trigger) && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className='sm:max-w-[425px]'>
        {Boolean(heading) && (
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            {Boolean(description) && (
              <DialogDescription className='mt-4 text-sm text-muted-foreground'>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {body}
        {Boolean(footer) && (
          <DialogFooter className='-mx-6 -mb-6 mt-6 rounded-b-lg bg-secondary p-4'>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
