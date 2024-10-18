// IconFlex.tsx
import { type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { type FC, type ReactNode } from 'react';

interface IconFlexProps {
  icon: keyof typeof Icons; // Valid Lucide icon name
  children: ReactNode;      // Content to display next to the icon
  size?: number;            // Optional: Icon size, default is 16
  className?: string;       // Optional: Extra CSS classes
}

const IconFlex: FC<IconFlexProps> = ({
  icon,
  children,
  size = 16,
  className = '',
}) => {
  const IconComponent = Icons[icon] as LucideIcon; // Type assertion for safety

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <IconComponent size={size} className="text-muted-foreground" />
      <div>{children}</div>
    </div>
  );
};

export default IconFlex;