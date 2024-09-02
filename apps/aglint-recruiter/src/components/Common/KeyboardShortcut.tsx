import React from 'react';

interface KeyProps {
  children: React.ReactNode;
}

const Key: React.FC<KeyProps> = ({ children }) => (
  <span className='inline-flex items-center justify-center min-w-[1.5em] px-1 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded border border-secondary-foreground/20'>
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
export function Example() {
  return (
    <div className='p-4 space-y-4'>
      <KeyboardShortcut keys={['⌘', 'K']} />
      <KeyboardShortcut keys={['Ctrl', 'Shift', 'P']} />
      <KeyboardShortcut keys={['Alt', 'F4']} />
    </div>
  );
}
