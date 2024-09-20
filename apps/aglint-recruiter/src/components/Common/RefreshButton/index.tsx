import { Button } from '@components/ui/button';
import { RefreshCw } from 'lucide-react';

const RefreshBtn = ({ text, isDisabled, onClick, animatedDisable = true }) => {
  return (
    <Button
      variant='outline'
      size='sm'
      disabled={isDisabled}
      onClick={async () => await onClick()}
      className={`flex items-center gap-2 ${
        isDisabled ? 'text-neutral-300' : 'text-neutral-400'
      }`}
    >
      <RefreshCw
        className={`h-4 w-4 ${
          isDisabled && animatedDisable ? 'animate-spin' : ''
        }`}
      />
      {isDisabled && animatedDisable ? 'Loading' : text}
    </Button>
  );
};

export default RefreshBtn;
