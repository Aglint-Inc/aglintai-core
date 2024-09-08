import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface IntegrationCardProps {
  as?: React.ElementType;
  slotLogo?: React.ReactNode;
  textName?: React.ReactNode;
  isConnected?: boolean;
  onClickCopyLink?: () => void;
  textLink?: React.ReactNode;
  isComingSoon?: boolean;
  onClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  learnHowLink?: string;
}

export function IntegrationCard({
  as: Component = Card,
  slotLogo,
  textName = 'Integration Name',
  isConnected = false,
  textLink = 'integration.com',
  isComingSoon = false,
  onClick,
  primaryText,
  secondaryText,
  primaryAction,
  secondaryAction,
  learnHowLink,
}: IntegrationCardProps) {
  return (
    <Component className='w-full max-w-sm'>
      <CardContent className='pt-6'>
        <div className='flex items-center space-x-4'>
          {slotLogo || (
            <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
              <span className='text-gray-500 text-xl font-bold'>
                {(textName as string).charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className='text-md font-semibold'>{textName}</h3>
            <Link
              href='#'
              className='text-sm text-gray-500 hover:underline'
              onClick={(e) => {
                e.preventDefault();
                onClick && onClick();
              }}
            >
              {textLink}
            </Link>
          </div>
          {isConnected && (
            <Badge
              variant='outline'
              className='ml-auto bg-green-50 text-green-700'
            >
              Connected
            </Badge>
          )}
          {isComingSoon && (
            <Badge
              variant='outline'
              className='ml-auto bg-yellow-50 text-yellow-700'
            >
              Coming Soon
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        {secondaryText === 'Learn How' ? (
          <Link href={learnHowLink} target='_blank' rel='noopener noreferrer'>
            <Button variant='link' size='sm'>
              Learn How
              <ExternalLink className='ml-1 h-4 w-4' />
            </Button>
          </Link>
        ) : (
          <Button variant='outline' size='sm' onClick={secondaryAction}>
            {secondaryText || 'Disconnect'}
          </Button>
        )}
        <Button
          variant={
            primaryText === 'Edit' ||
            primaryText === 'Re-Connect' ||
            primaryText === 'Re-Upload' ||
            primaryText === 'Settings'
              ? 'outline'
              : 'default'
          }
          size='sm'
          onClick={primaryAction}
        >
          {primaryText || 'Connect'}
        </Button>
      </CardFooter>
    </Component>
  );
}
