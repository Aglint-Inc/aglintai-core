import { Button } from '@components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

function CompanySlider({ slides }: { slides: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className='relative mt-8' style={{ height: '300px' }}>
      <Image
        // eslint-disable-next-line security/detect-object-injection
        src={slides[currentSlide]}
        alt={`Company image ${currentSlide + 1}`}
        className='rounded-lg object-cover'
        fill
        sizes='100vw'
        priority
      />
      <Button
        variant='outline'
        className='absolute left-4 top-1/2 -translate-y-1/2 transform'
        onClick={prevSlide}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
      <Button
        variant='outline'
        className='absolute right-4 top-1/2 -translate-y-1/2 transform'
        onClick={nextSlide}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default CompanySlider;
