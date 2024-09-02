import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Pencil } from 'lucide-react';

export function Overview() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Overview</CardTitle>
        <Button variant='ghost' size='sm'>
          <Pencil className='h-4 w-4' />
          <span className='sr-only'>Edit Overview</span>
        </Button>
      </CardHeader>
      <CardContent>
        <h2 className='text-xl font-bold mb-2'>Our Mission</h2>
        <p className='text-sm text-gray-500 mb-4'>
          Helping individuals, families, and communities live healthier more
          fulfilling lives by providing them access to healthier, affordable,
          and enjoyable food & lifestyle choices.
        </p>
        <div className='relative aspect-video'>
          {/* <Image
            src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/good-health-video-thumbnail-zNGIvTmIUuI7PNaVuPPTQOmkHq5Nw3.png'
            alt="A greeting from Petra, Good Health's Founder & CEO"
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          /> */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <Button variant='secondary' size='sm'>
              Play Video
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
