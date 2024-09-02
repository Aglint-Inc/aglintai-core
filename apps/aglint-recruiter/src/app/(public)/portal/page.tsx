import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

import { Button } from '@/src/components//ui/button';
import { Input } from '@/src/components//ui/input';

const Page = () => {
  return (
    <>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <nav
          className='grid gap-4 text-sm text-muted-foreground'
          x-chunk='dashboard-04-chunk-0'
        >
          <Link href='#' className='font-semibold text-primary'>
            General
          </Link>
          <Link href='#'>Support</Link>
          <Link href='#'>Advanced</Link>
        </nav>
        <div className='grid gap-6'>
          <Card x-chunk='dashboard-04-chunk-1'>
            <CardHeader>
              <CardTitle>Personal details</CardTitle>
              <CardDescription>Used to identify the candidate.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='flex flex-col gap-4'>
                <Input placeholder='Name' />
                <Input placeholder='Email' />
              </form>
            </CardContent>
            <CardFooter className='border-t px-6 py-4'>
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk='dashboard-04-chunk-2'>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customise your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form className='flex flex-col gap-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='include' defaultChecked />
                  <label
                    htmlFor='include'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Receive personalized emails.
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter className='border-t px-6 py-4'>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
