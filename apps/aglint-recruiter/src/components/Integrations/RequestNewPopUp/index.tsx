import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useRef, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { supabase } from '@/utils/supabase/client';

function RequestNew({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const { recruiter } = useTenant();
  const { toast } = useToast();
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [showThanks, setShowThanks] = useState(false);
  async function requestTool() {
    const recruiter_id = recruiter.id;
    const tool_name = nameRef.current!.value;
    const description = descriptionRef.current!.value;
    if (tool_name) {
      supabase
        .from('request_integration_tool')
        .insert({ recruiter_id, tool_name, description })
        .select()
        .then(async () => {
          await axios.post('/api/sendgrid', {
            fromEmail: 'admin@aglinthq.com',
            fromName: recruiter?.name,
            email: 'ravi@aglinthq.com',
            subject: 'Integration Tool Request',
            text: `
                  <body>
                  <h1>Integration Tool Request</h1>
                  <p>We urgently need <b>${tool_name}</b> integration tool for improved team communication and collaboration. Can we discuss this further in a meeting?</p>
                  <p>Description : ${description}</p>
                  <p>Best regards,<br>
                  ${recruiter?.name}</p>
                  </body>
              `,
          });
        });
      setShowThanks(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Please enter the name of the integration!',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-[425px]'>
        {showThanks ? (
          <div className='flex flex-col items-center justify-center p-6 text-center'>
            <div className='mb-4 text-green-500'>
              <ThumbsUp size={48} />
            </div>
            <h2 className='mb-2 text-2xl font-bold'>Thank You!</h2>
            <p className='mb-6 text-gray-600'>
              Thank you for your time. We will review your request and get back
              to you.
            </p>
            <Button
              onClick={() => {
                close();
                setTimeout(() => {
                  setShowThanks(false);
                }, 500);
              }}
              size='sm'
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600'
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Integration</DialogTitle>
            </DialogHeader>
            <div className='flex flex-col space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='integration-name'>Integration Name</Label>
                <Input
                  id='integration-name'
                  ref={nameRef}
                  placeholder='Enter the name of the integration'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='integration-description'>Description</Label>
                <Textarea
                  id='integration-description'
                  placeholder='Add a brief description (Optional)'
                  className='resize-none'
                />
              </div>
            </div>
            <DialogFooter className='-mx-6 -mb-6 mt-6 rounded-b-lg bg-secondary p-4'>
              <Button
                variant='outline'
                onClick={() => {
                  close();
                  setShowThanks(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={requestTool}>Request</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RequestNew;
