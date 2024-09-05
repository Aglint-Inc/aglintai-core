import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import { Textarea } from '@components/ui/textarea';
import { useState } from 'react';

export default function ConfigureCompanyEdit() {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <div className='w-full max-w-2xl space-y-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-lg font-semibold'>Company About</h1>
          <p className='text-sm text-muted-foreground'>
            This section content will be displayed on the candidate portal as the about section.
          </p>
        </div>
        <ScrollArea className='h-72 w-full rounded-md border bg-gray-100'>
          <div className='w-full p-4 space-y-4  '>
            We deliver a great experience We prioritize a great candidate
            experience, providing clear communication, feedback, and support for
            a positive process. From start to finish, we provide clear
            communication, timely feedback, and support, creating a positive and
            inclusive process that aligns with our commitment to finding the
            right fit for both our organization and candidates. Our dedicated
            team ensures that each step of the process is handled with the
            utmost professionalism and care, making sure that every interaction
            is smooth and respectful. We continuously strive to improve our
            processes based on feedback and industry best practices, aiming to
            exceed expectations and foster long-term relationships. Our
            commitment extends beyond just recruitment; we believe in creating a
            welcoming and supportive environment that contributes to the overall
            success and satisfaction of our candidates. We take pride in our
            personalized approach, tailoring our services to meet the unique
            needs of each candidate and organization, ensuring a customized
            experience that aligns with your goals. Our experienced team is
            always available to provide guidance and answer any questions you
            may have, making sure you feel supported and informed throughout the
            entire process. We actively seek to build lasting partnerships by
            maintaining open lines of communication and providing ongoing
            support, both during and after the recruitment process. Our goal is
            to create a seamless experience that not only meets but exceeds your
            expectations, ensuring that every candidate and client feels valued
            and respected. For more information about our services, visit our
            Services Page. If you have any questions or need assistance, feel
            free to reach out to us via our Contact Page. Visit us at: Example
            Company 1234 Elm Street Springfield, IL 62704 USA
          </div>
        </ScrollArea>
      </div>


<Dialog>
<DialogTrigger asChild>
  <Button variant="outline" className='mt-4'>Edit Company About</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Company About</DialogTitle>
            <DialogDescription>
              Edit the about section of your company.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={text}
            onChange={handleTextChange}
            placeholder='Start typing here...'
            className='min-h-[200px] p-4 border border-muted-foreground rounded-md bg-background'
          />
          <DialogFooter className='w-full flex flex-row gap-2 justify-between'>
            <Button variant='secondary' className='w-full'>
              Cancel
            </Button>
            <Button type='submit' className='w-full'>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
