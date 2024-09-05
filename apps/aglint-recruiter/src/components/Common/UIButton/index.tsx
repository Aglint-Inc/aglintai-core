import { Button, ButtonProps } from '@components/ui/button';
import React from 'react';

interface ExtendedButtonProps extends ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const UIButton = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  ({ leftIcon, rightIcon, children, size, ...props }, ref) => {
    const LeftIconWithClass = leftIcon
      ? React.cloneElement(leftIcon as React.ReactElement, {
          className:
            size === 'sm'
              ? 'h-3 w-3'
              : size === 'md'
                ? 'h-4 w-4'
                : 'h-5 w-5',
        })
      : null;

    const RightIconWithClass = rightIcon
      ? React.cloneElement(rightIcon as React.ReactElement, {
          className:
            size === 'sm'
              ? 'h-3 w-3'
              : size === 'md'
                ? 'h-4 w-4'
                : 'h-5 w-5',
        })
      : null;

    return (
      <Button {...props} ref={ref} size={size}>
        {LeftIconWithClass && (
          <span
            className={
              size === 'sm' ? 'mr-1' : size === 'md' ? 'mr-2' : 'mr-3'
            }
          >
            {LeftIconWithClass}
          </span>
        )}
        {children}
        {RightIconWithClass && (
          <span
            className={
              size === 'sm' ? 'ml-1' : size === 'md' ? 'ml-2' : 'ml-3'
            }
          >
            {RightIconWithClass}
          </span>
        )}
      </Button>
    );
  },
);

UIButton.displayName = 'UIButton';

export { UIButton };
