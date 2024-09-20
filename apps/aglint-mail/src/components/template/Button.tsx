import { Button } from '@react-email/components';

type Color = 'accent' | 'error' | 'neutral';

export const ButtonSolid = ({
  href,
  buttonText,
  color = 'accent',
}: {
  buttonText: string;
  href: string;
  color?: Color;
}) => {
  return (
    <Button
      className={`px-3 py-2 bg-${color}-9 text-white br rounded-[4px] text-text-xs cursor-not-allowed`}
      href={href}
      style={{
        pointerEvents: href ? 'auto' : 'none',
      }}
    >
      {buttonText}
    </Button>
  );
};
