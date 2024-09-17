import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@components/ui/drawer';
import { ScrollArea } from '@components/ui/scroll-area';
import { X as CloseIcon } from 'lucide-react'; // Import Lucide Close Icon
import React from 'react';

import { UIButton } from '../UIButton';
import UITypography from '../UITypography';

function UIDrawer({
  children,
  open,
  onClose,
  slotBottom,
  title,
  size = 'half',
  calendar,
}: {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  slotBottom?: React.ReactNode;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'full' | 'half';
  calendar?: React.ReactNode;
}) {
  // Determine width based on size variant
  const widthClass = {
    sm: 'w-[500px]',
    md: 'w-[700px]',
    lg: 'w-[900px]',
    full: 'w-[calc(100vw-100px)]',
    half: 'w-[calc(50vw)]',
  }[size];

  return (
    <Drawer open={open} onClose={onClose} direction='right'>
      <DrawerContent
        className={`left-auto right-0 top-0 mt-0 h-screen ${widthClass} rounded-none`}
      >
        <div className='flex w-full flex-row'>
          {calendar}
          <div className='w-full border-l border-gray-200'>
            <UIButton
              onClick={onClose}
              className='absolute right-2 top-2 h-8 w-8 p-2 text-gray-600 hover:text-gray-800'
              variant='ghost'
            >
              <CloseIcon size={16} />
            </UIButton>
            <DrawerHeader className='items-center border-b border-gray-200 p-3'>
              <div className='flex flex-row items-center'>
                <UITypography className='text-sm' fontBold='normal'>
                  {title}
                </UITypography>
              </div>
            </DrawerHeader>
            <ScrollArea className='h-[calc(100vh-95px)]'>{children}</ScrollArea>
            {slotBottom && (
              <DrawerFooter className='h-12 border-t border-gray-200'>
                <div className='flex h-full flex-row items-center justify-center gap-4'>
                  {slotBottom}
                </div>
              </DrawerFooter>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default UIDrawer;
