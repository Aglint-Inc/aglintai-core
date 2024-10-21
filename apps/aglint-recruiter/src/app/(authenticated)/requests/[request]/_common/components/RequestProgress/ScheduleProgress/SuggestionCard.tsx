import { Alert, AlertDescription } from '@components/ui/alert';
import { Lightbulb } from 'lucide-react';
import { type FC, type ReactNode } from 'react';

interface SuggestionAlertProps {
  heading: string;
  description: string;
  buttonSlot?: ReactNode;
}

const SuggestionCard: FC<SuggestionAlertProps> = ({
  description,
  buttonSlot,
  heading,
}) => {
  return (
    <Alert
      variant='default'
      className='mb-4 border-purple-200 bg-purple-200 p-3 dark:border-purple-200/50 dark:bg-purple-600/10'
    >
      <div className='mb-2 flex flex-row items-center gap-1 text-purple-600'>
        <Lightbulb className='h-4 w-4' />
        <div className='text-sm'>{heading}</div>
      </div>
      <AlertDescription className='flex flex-col items-start'>
        <p className='mb-2 w-full text-sm'>{description}</p>
        {buttonSlot}
      </AlertDescription>
    </Alert>
  );
};

export default SuggestionCard;
