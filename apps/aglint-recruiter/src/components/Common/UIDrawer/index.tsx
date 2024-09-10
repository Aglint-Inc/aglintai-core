import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
        className={`h-screen top-0 right-0 left-auto mt-0 ${widthClass} rounded-none `}
      >
        <div className='flex flex-row w-full'>
          {calendar}
          <div className='border-l border-gray-200 w-full'>
            <UIButton
              onClick={onClose}
              className='absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800 h-8 w-8'
              variant='ghost'
            >
              <CloseIcon size={16} />
            </UIButton>
            <DrawerHeader className='border-b border-gray-200 items-center p-3'>
              <div className='flex flex-row items-center'>
                <UITypography className='text-sm' fontBold='normal'>
                  {title}
                </UITypography>
              </div>
            </DrawerHeader>
            <ScrollArea>{children}</ScrollArea>
            {slotBottom && (
              <DrawerFooter className='border-t border-gray-200 h-12'>
                <div className='flex flex-row items-center justify-center gap-4 h-full'>
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
