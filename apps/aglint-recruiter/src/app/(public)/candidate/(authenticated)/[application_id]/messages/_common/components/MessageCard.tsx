import { dayjsLocal } from '@aglint/shared-utils';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Parser } from 'html-to-react';
import { CheckCheck, Clock, Mail } from 'lucide-react';

import { useCandidatePortalMessages } from '../hooks';

const MessageCard = ({ index }: { index: number }) => {
  const message = useCandidatePortalMessages()['data'][index];

  const htmlParser = Parser();
  return (
    <Card className='mx-auto mb-4 overflow-hidden rounded-lg border shadow-none'>
      <CardHeader className='flex items-center px-6 py-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-row items-center justify-center gap-4'>
            <div className='flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              <div className='text-sm'>From</div>

              <div className='text-sm font-semibold'>
                {message?.company_name}
              </div>
            </div>
            <div className='ml-auto flex items-center gap-2 text-center text-sm sm:text-right'>
              <Clock className='h-4 w-4' />
              <p className='text-sm'>
                {dayjsLocal(message.created_at).fromNow()}
              </p>
            </div>
            {message.isSubmitted && (
              <div className='ml-auto flex items-center gap-2 text-center text-sm sm:text-right'>
                <CheckCheck className='h-4 w-4 text-green-700' />
                <p className='text-sm text-green-700'>Completed</p>
              </div>
            )}
            {message.isNew && (
              <Badge className='rounded-md bg-red-500 px-2 py-0.5 text-xs'>
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-6'>
        <h2 className='text-md font-semibold'>{message.title}</h2>
        <p className='mt-2 text-sm font-normal opacity-70'>
          {htmlParser.parse(message.message)}
        </p>
      </CardContent>
      {!message?.isSubmitted &&
        (message?.availability_id || message?.filter_id) && (
          <CardFooter className='w-full'>
            <Button
              variant='outline'
              className='w-full'
              disabled={!message?.link}
              onClick={() => {
                if (message?.link) window.open(message.link, '_blank');
              }}
            >
              {message?.availability_id
                ? 'Submit Availability'
                : message?.filter_id
                  ? 'Submit Schedule'
                  : ''}
            </Button>
          </CardFooter>
        )}
    </Card>
  );
};

export default MessageCard;
