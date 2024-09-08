import { Button } from '@components/ui/button';
import { Loader2, Rocket } from 'lucide-react';
import { useState } from 'react';

const PublishButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => Promise<void>;
  disabled?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!disabled && !isLoading) {
      setIsLoading(true);
      await onClick();
      setIsLoading(false);
    }
  };

  return (
    <Button size='sm' onClick={handleClick} disabled={disabled || isLoading}>
      {isLoading ? (
        <>
          <Loader2 className='mr-2 h-3 w-3 animate-spin' />
          Publishing
        </>
      ) : (
        <>
          <Rocket className='mr-2 h-3 w-3' />
          Publish
        </>
      )}
    </Button>
  );
};

export default PublishButton;
