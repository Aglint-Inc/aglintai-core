import React from 'react';

interface KeyProps {
  children: React.ReactNode;
}

const Key: React.FC<KeyProps> = ({ children }) => (
  <span className='inline-flex min-w-[1.5em] items-center justify-center rounded border border-secondary-foreground/20 bg-secondary px-1 py-0.5 text-xs font-medium text-secondary-foreground'>
    {children}
  </span>
);

interface KeyboardShortcutProps {
  keys: string[];
}

export default function KeyboardShortcut({ keys }: KeyboardShortcutProps) {
  return (
    <div className='inline-flex items-center space-x-1 rounded bg-secondary/50 p-1'>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className='text-xs text-muted-foreground'>+</span>
          )}
          <Key>{key}</Key>
        </React.Fragment>
      ))}
    </div>
  );
}

// Example usage
