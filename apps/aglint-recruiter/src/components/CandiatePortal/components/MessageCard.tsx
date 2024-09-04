import { dayjsLocal } from '@aglint/shared-utils';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import Image from 'next/image';

import { apiResponsePortalMessage } from '@/app/api/candidate_portal/get_message/route';

const MessageCard = ({
  message,
}: {
  message: apiResponsePortalMessage[number];
}) => {
  return (
    <Card className='mx-auto rounded-lg overflow-hidden border  mb-4'>
      <CardHeader className='flex items-center px-6 py-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center'>
            <Image
              className='block w-10 h-10 rounded-full'
              width={50}
              height={50}
              src={message?.company_logo || ''}
              alt={message?.company_name || ''}
            />
            {message?.company_name || ''}
          </div>
          <div className=' text-sm ml-auto text-center sm:text-right'>
            <p className='text-sm mt-2 text-gray-500'>
              {dayjsLocal(message.created_at).fromNow()}
            </p>
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            {/* <a href='#' className='text-blue-500 hover:underline'>
              View in email
            </a> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-6'>
        <h2 className='text-md font-semibold'>{message.title}</h2>
        <p className='text-sm font-normal mt-2'>
          <iframe
            height={'100%'}
            width={'100%'}
            color='white'
            srcDoc={message.message}
            title='Previw Email'
          />
        </p>
      </CardContent>
      {/* <CardFooter className='px-6 py-4'>
          <Button
            variant='outline'
            className='w-full py-2 px-4 rounded border border-gray-300'
          >
            Submit Availability
          </Button>
        </CardFooter> */}
    </Card>
  );
};

export default MessageCard;
