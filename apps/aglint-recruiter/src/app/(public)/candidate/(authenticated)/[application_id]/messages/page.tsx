'use client';
import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, MoreHorizontal, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

import { apiResponsePortalMessage } from '@/src/app/api/candidate_portal/get_message/route';
import { usePortalMessage } from '@/src/components/CandiatePortal/hook';
import Loader from '@/src/components/Common/Loader';

export default function MessagesPage({ params }) {
  const application_id = params.application_id;
  // const application_id = '4bbaf6ec-775f-4cfe-8627-553b327bffa9';
  const { isLoading, data } = usePortalMessage({ application_id });

  const [selectedMessage, setSelectedMessage] =
    useState<apiResponsePortalMessage[0]>(null);

  useEffect(() => {
    if (data?.length > 0 && selectedMessage === null)
      setSelectedMessage(data[0]);
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) return 'No data';

  if (data)
    return (
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 flex-grow p-6'>
        <main className='lg:w-[30%] space-y-4 overflow-y-auto'>
          {data.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer ${selectedMessage?.id === message.id ? 'border-primary border' : 'border border-border'}`}
              onClick={() => setSelectedMessage(message)}
            >
              <CardContent className='p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='font-semibold'>{message.title}</h3>
                  {!message.is_readed && (
                    <span className='bg-orange-500 rounded-full w-2 h-2'></span>
                  )}
                </div>
                <div className='flex items-center text-sm text-gray-500'>
                  <Avatar className='w-6 h-6 mr-2'>
                    <AvatarImage src={message.recruiter_user.profile_image} />
                    <AvatarFallback>
                      {message.recruiter_user.first_name}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {getFullName(
                      message.recruiter_user.first_name,
                      message.recruiter_user.last_name,
                    )}
                  </span>
                  <span className='mx-2'>•</span>
                  <span>
                    {dayjsLocal(message.created_at).format('MMM DD hh:mm A')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </main>
        <aside className='lg:w-[70%] space-y-6 bg-white p-6 rounded-lg shadow'>
          {selectedMessage && (
            <>
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>{selectedMessage.title}</h2>
                <div className='flex space-x-2'>
                  <Button variant='outline' size='icon'>
                    <Upload className='h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='icon'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </div>
              </div>
              <div className='flex items-center text-sm text-gray-500'>
                <Avatar className='w-8 h-8 mr-2'>
                  <AvatarImage
                    src={selectedMessage.recruiter_user.profile_image}
                  />
                  <AvatarFallback>
                    {selectedMessage.recruiter_user.first_name}
                  </AvatarFallback>
                </Avatar>
                <span>
                  {getFullName(
                    selectedMessage.recruiter_user.first_name,
                    selectedMessage.recruiter_user.last_name,
                  )}
                </span>
                <span className='mx-2'>•</span>
                <span>
                  {dayjsLocal(selectedMessage.created_at).format(
                    'MMM DD hh:mm A',
                  )}
                </span>
                <span className='mx-2'>•</span>
                <span>Preliminary Phone Screen</span>
              </div>
              <div className='mt-4 text-gray-700 whitespace-pre-wrap'>
                {selectedMessage.message}
              </div>
              <div className='mt-6'>
                <h3 className='font-semibold mb-2'>Meeting with Good Health</h3>
                <div className='flex items-center text-sm text-gray-500'>
                  <Clock className='mr-2 h-4 w-4' />
                  <span>45 minutes</span>
                </div>
                <Button className='mt-2' variant='secondary'>
                  <Check className='mr-2 h-4 w-4' />
                  Availability shared
                </Button>
              </div>
            </>
          )}
        </aside>
      </div>
    );
}

// interface Message {
//   id: number;
//   title: string;
//   sender: string;
//   date: string;
//   content: string;
//   unread: boolean;
// }

// const messages: Message[] = [
//   {
//     id: 1,
//     title: "Let's get to know each other",
//     sender: 'Jenny L.',
//     date: 'Feb 10 at 10:38am',
//     content:
//       "Hey Allison 👋\n\nThanks for your interest in the position at Good Health. We're excited to move forward with the interview process.\n\nTo help us schedule your following interview, please let us know when you're available by sharing a few time windows over the next seven days that work for you.\n\nWe're looking forward to speaking with you.",
//     unread: false,
//   },
//   {
//     id: 2,
//     title: 'Interview Scheduled: Next Steps',
//     sender: 'Mark R.',
//     date: 'Feb 12 at 2:15pm',
//     content:
//       "Hello Allison,\n\nGreat news! We've scheduled your interview for next Tuesday at 3:00 PM PT. You'll be meeting with our senior software engineer, Jim Halpert.\n\nPlease find the Zoom link attached to this message. If you need to reschedule or have any questions, don't hesitate to reach out.\n\nBest regards,\nMark",
//     unread: true,
//   },
//   {
//     id: 3,
//     title: 'Pre-interview Information',
//     sender: 'Sarah K.',
//     date: 'Feb 14 at 9:22am',
//     content:
//       "Hi Allison,\n\nI hope this message finds you well. As your interview is coming up, I wanted to provide you with some additional information that might be helpful.\n\nWe've attached a brief overview of our company culture and the team you'd be working with. Also, please be prepared to discuss your experience with agile methodologies and any recent projects you've worked on.\n\nIf you have any questions before the interview, feel free to ask.\n\nGood luck!\nSarah",
//     unread: true,
//   },
//   {
//     id: 4,
//     title: 'Thank You for Your Interview',
//     sender: 'Jim H.',
//     date: 'Feb 16 at 5:45pm',
//     content:
//       "Dear Allison,\n\nThank you for taking the time to speak with me today. I enjoyed our conversation about your experiences and your approach to problem-solving.\n\nYour insights on improving our current systems were particularly interesting. We'll be in touch soon with next steps.\n\nBest regards,\nJim Halpert",
//     unread: false,
//   },
// ];
