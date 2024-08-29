'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@components/shadcn/ui/avatar';
import { Button } from '@components/shadcn/ui/button';
import { Card, CardContent } from '@components/shadcn/ui/card';
import { useState } from 'react';

import { Footer } from '@/src/components/CandiatePortal/Layout/Footer';
import Navbar from '@/src/components/CandiatePortal/Layout/Navbar';
import { PageHeader } from '@/src/components/CandiatePortal/Layout/PageHeader';

interface Message {
  id: number;
  title: string;
  sender: string;
  date: string;
  content: string;
  unread: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    title: "Let's get to know each other",
    sender: 'Jenny L.',
    date: 'Feb 10 at 10:38am',
    content:
      "Hey Allison 👋\n\nThanks for your interest in the position at Good Health. We're excited to move forward with the interview process.\n\nTo help us schedule your following interview, please let us know when you're available by sharing a few time windows over the next seven days that work for you.\n\nWe're looking forward to speaking with you.",
    unread: false,
  },
  // Add more messages as needed
];

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(
    messages[0],
  );

  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 flex-grow p-6'>
      <main className='lg:w-[30%] space-y-4 overflow-y-auto'>
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer ${selectedMessage?.id === message.id ? 'border-primary' : ''}`}
            onClick={() => setSelectedMessage(message)}
          >
            <CardContent className='p-4'>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='font-semibold'>{message.title}</h3>
                {message.unread && (
                  <span className='bg-orange-500 rounded-full w-2 h-2'></span>
                )}
              </div>
              <div className='flex items-center text-sm text-gray-500'>
                <Avatar className='w-6 h-6 mr-2'>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${message.sender}`}
                  />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <span>{message.sender}</span>
                <span className='mx-2'>•</span>
                <span>{message.date}</span>
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
                    <polyline points='16 6 12 2 8 6' />
                    <line x1='12' y1='2' x2='12' y2='15' />
                  </svg>
                </Button>
                <Button variant='outline' size='icon'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='12' cy='12' r='1' />
                    <circle cx='19' cy='12' r='1' />
                    <circle cx='5' cy='12' r='1' />
                  </svg>
                </Button>
              </div>
            </div>
            <div className='flex items-center text-sm text-gray-500'>
              <Avatar className='w-8 h-8 mr-2'>
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${selectedMessage.sender}`}
                />
                <AvatarFallback>{selectedMessage.sender[0]}</AvatarFallback>
              </Avatar>
              <span>{selectedMessage.sender}</span>
              <span className='mx-2'>•</span>
              <span>{selectedMessage.date}</span>
              <span className='mx-2'>•</span>
              <span>Preliminary Phone Screen</span>
            </div>
            <div className='mt-4 text-gray-700 whitespace-pre-wrap'>
              {selectedMessage.content}
            </div>
            <div className='mt-6'>
              <h3 className='font-semibold mb-2'>Meeting with Good Health</h3>
              <div className='flex items-center text-sm text-gray-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2'
                >
                  <circle cx='12' cy='12' r='10' />
                  <polyline points='12 6 12 12 16 14' />
                </svg>
                <span>45 minutes</span>
              </div>
              <Button className='mt-2' variant='secondary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2'
                >
                  <polyline points='20 6 9 17 4 12' />
                </svg>
                Availability shared
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
