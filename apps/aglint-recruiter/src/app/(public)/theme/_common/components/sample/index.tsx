import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { BarChart, LineChart } from 'lucide-react';

export default function SampleShowcase() {
  return (
    <div className='grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle>Move Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Set your daily activity goal.
          </p>
          <div className='mt-4 flex w-full items-center'>
            <Button variant='outline' className='h-8 w-8 shrink-0 rounded-full'>
              -
            </Button>
            <div className='mx-4 text-4xl font-bold'>350</div>
            <Button variant='outline' className='h-8 w-8 shrink-0 rounded-full'>
              +
            </Button>
          </div>
          <p className='mt-1 text-xs text-muted-foreground'>CALORIES/DAY</p>
          <div className='mt-4 h-[120px]'>
            <BarChart className='h-full w-full text-primary-foreground' />
          </div>
          <Button className='mt-4 w-full'>Set Goal</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+2350</div>
          <p className='text-xs text-muted-foreground'>
            +180.1% from last month
          </p>
          <div className='mt-4 h-[200px]'>
            <BarChart className='h-full w-full text-primary' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>June 2023</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode='single' selected={new Date()} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>$15,231.89</div>
          <p className='text-xs text-muted-foreground'>
            +20.1% from last month
          </p>
          <div className='mt-4 h-[200px]'>
            <LineChart className='h-full w-full text-primary' />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {['Sofia Davis', 'Jackson Lee', 'Isabella Nguyen'].map(
              (name, i) => (
                <div key={i} className='flex items-center'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage
                      src={`/placeholder.svg?height=36&width=36`}
                      alt={name}
                    />
                    <AvatarFallback className='bg-primary text-secondary'>
                      {name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-4 space-y-1'>
                    <p className='text-sm font-medium leading-none'>{name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {name.toLowerCase().split(' ').join('.')}@example.com
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <Card className='flex flex-col'>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-grow flex-col'>
          <div className='space-y-4'>
            <div className='flex items-start'>
              <Avatar className='h-9 w-9'>
                <AvatarImage
                  src={`/placeholder.svg?height=36&width=36`}
                  alt='Sofia'
                />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className='ml-4 rounded-md bg-secondary p-2'>
                <p className='text-sm'>Hi, how can I help you today?</p>
              </div>
            </div>
            <div className='flex items-start justify-end'>
              <div className='mr-4 rounded-md bg-primary p-2 text-primary-foreground'>
                <p className='text-sm'>
                  Hey, I`m having trouble with my account.
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-grow' />
          <div className='mt-4 flex items-center'>
            <Input placeholder='Type your message...' className='flex-grow' />
            <Button className='ml-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-4 w-4'
              >
                <line x1='22' y1='2' x2='11' y2='13'></line>
                <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className='col-span-full'>
        <CardHeader>
          <CardTitle>Cookie Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Manage your cookie settings here.
          </p>
          <Button variant='outline' className='mt-4'>
            Manage Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
