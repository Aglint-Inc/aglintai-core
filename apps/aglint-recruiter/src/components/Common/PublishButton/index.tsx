import { Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';

const PublishButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => Promise<boolean>;
  disabled?: boolean;
}) => {
  const { publishing, setPublishing } = useJobDashboardStore(
    ({ publishing, setPublishing }) => ({ publishing, setPublishing }),
  );
  const [isLoading, setIsLoading] = useState(false);

  const text =
    publishing === 0
      ? 'Publish'
      : publishing === 1
        ? 'Publishing'
        : 'Published';

  const handleClick = async () => {
    if (!disabled && publishing === 0) {
      setPublishing(1);
      setIsLoading(true);
      const confirmation = await onClick();
      if (confirmation) {
        setTimeout(() => setPublishing(2), 1000);
      } else {
        setPublishing(0);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (publishing === 2) {
      const timer = setTimeout(() => setPublishing(0), 1500);
      return () => clearTimeout(timer);
    }
  }, [publishing, setPublishing]);

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`w-[120px] h-[32px] transition-all duration-1000 overflow-hidden
        ${
          publishing === 0
            ? disabled
              ? 'bg-neutral-300 text-neutral-700'
              : 'bg-primary hover:bg-primary-dark'
            : publishing === 1
              ? 'bg-primary-dark'
              : 'bg-success hover:bg-success'
        }`}
    >
      <div className='flex items-center gap-2'>
        <Rocket
          className={`transition-transform duration-1000 ease-in-out
            ${publishing === 1 ? 'translate-y-[-20px]' : ''}
            ${publishing === 2 ? 'translate-y-[-40px]' : ''}
          `}
        />
        <span>{text}</span>
      </div>
    </Button>
  );
};

export default PublishButton;
