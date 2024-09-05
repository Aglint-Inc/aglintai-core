import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Parser } from 'html-to-react';
import { Clock, Mail } from 'lucide-react';

import { useCandidatePortalMessages } from '@/candidate/authenticated/hooks';

const MessageCard = ({ index }: { index: number }) => {
  const message = useCandidatePortalMessages()['data'][index];

  const htmlParser = Parser();
  return (
    <Card className='mx-auto rounded-lg overflow-hidden border shadow-none mb-4'>
      <CardHeader className='flex items-center px-6 py-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-row items-center gap-4 justify-center'>
            <div className='flex items-center gap-2'>
              <Mail className='w-4 h-4' />
              <div className='text-sm'>From</div>

              <div className='text-sm font-semibold'>
                {message?.company_name}
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm ml-auto text-center sm:text-right'>
              <Clock className='w-4 h-4' />
              <p className='text-sm'>
                {dayjsLocal(message.created_at).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-6'>
        <h2 className='text-md font-semibold'>{message.title}</h2>
        <p className='text-sm font-normal mt-2 opacity-70'>
          {htmlParser.parse(message.message)}
        </p>
      </CardContent>
      <CardFooter className='w-full'>
        <Button variant='outline' className='w-full'>
          Submit Availability
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
