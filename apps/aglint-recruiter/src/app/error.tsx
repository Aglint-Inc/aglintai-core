'use client';

import { createClient } from '@supabase/supabase-js';

import html2canvas from 'html2canvas';
import { AlertCircle, Camera, Send } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/src/utils/supabase/client';

import { submitErrorReport } from '@/src/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ErrorPage() {
  const [errorDescription, setErrorDescription] = useState('');
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const captureScreenshot = async () => {
    const canvas = await html2canvas(document.body);
    const screenshot = canvas.toDataURL('image/png');
    setScreenshotData(screenshot);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let screenshotUrl = null;
      if (screenshotData) {
        const fileName = `error-screenshot-${uuidv4()}.png`;
        const { data, error } = await supabase.storage
          .from('error-screenshots')
          .upload(fileName, base64ToBlob(screenshotData), {
            contentType: 'image/png',
          });

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from('error-screenshots').getPublicUrl(fileName);

        screenshotUrl = publicUrl;
      }

      await submitErrorReport(errorDescription, screenshotUrl);

      setErrorDescription('');
      setScreenshotData(null);
      alert('Error report submitted. Thank you!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit error report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-md'>
        <div className='flex items-center justify-center mb-6'>
          <AlertCircle className='w-12 h-12 text-red-500 mr-4' />
          <h1 className='text-2xl font-bold text-gray-800'>
            Oops! Something went wrong
          </h1>
        </div>
        <p className='text-gray-600 mb-6 text-center'>
          We're sorry, but it seems that our system has encountered an
          unexpected error. Please help us improve by reporting this issue.
        </p>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Textarea
            placeholder='Please describe what you were doing when the error occurred...'
            value={errorDescription}
            onChange={(e) => setErrorDescription(e.target.value)}
            className='w-full h-32'
          />
          <div className='flex justify-between items-center'>
            <Button
              type='button'
              variant='outline'
              onClick={captureScreenshot}
              className='flex items-center'
            >
              <Camera className='w-4 h-4 mr-2' />
              Capture Screenshot
            </Button>
            <Button
              type='submit'
              className='flex items-center'
              disabled={isSubmitting}
            >
              <Send className='w-4 h-4 mr-2' />
              {isSubmitting ? 'Sending...' : 'Send Report'}
            </Button>
          </div>
          {screenshotData && (
            <div className='mt-4'>
              <p className='text-sm text-gray-600 mb-2'>Screenshot Preview:</p>
              <img
                src={screenshotData}
                alt='Error Screenshot'
                className='w-full border rounded'
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
