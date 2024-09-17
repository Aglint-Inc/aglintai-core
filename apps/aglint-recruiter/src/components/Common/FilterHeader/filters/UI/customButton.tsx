import { Button } from '@components/ui/button';

export interface ButtonInterface {
  text: string;
  isActive?: boolean;
  isDotVisible?: boolean;
  slotLeftIcon?: React.ReactNode;
  slotRightIcon?: React.ReactNode;
  onClick?: () => void;
}
export default function CustomButton({
  text,
  isActive = false,
  isDotVisible = false,
  slotLeftIcon,
  slotRightIcon,
  onClick,
}: ButtonInterface) {
  return (
    <Button variant='outline' className='relative' onClick={onClick}>
      <div className='flex row gap-2 items-center'>
        {slotLeftIcon ? slotLeftIcon : false}
        {text}
        {slotRightIcon ? slotRightIcon : false}
      </div>
      {isDotVisible && isActive && (
        <span className='absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white' />
      )}
    </Button>
  );
}
