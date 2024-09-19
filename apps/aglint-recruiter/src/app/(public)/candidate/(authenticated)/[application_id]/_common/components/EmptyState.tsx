import { Card, CardContent } from '@components/ui/card';
import { type LucideIcon } from 'lucide-react';
import React from 'react';

interface DynamicIconTextProps {
  icon: LucideIcon;
  text: string;
}

export default function EmptyState({ icon: Icon, text }: DynamicIconTextProps) {
  return (
    <Card className='h-full w-full shadow-none'>
      <CardContent className='flex h-full flex-col items-center justify-center p-6 text-center'>
        <Icon className='mb-4 h-10 w-10' strokeWidth={1} aria-hidden='true' />
        <p className='text-sm'>{text}</p>
      </CardContent>
    </Card>
  );
}
