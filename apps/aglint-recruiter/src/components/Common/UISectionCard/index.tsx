import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { type LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Loader } from '../Loader';

interface InfoCardProps {
  title: string;
  description?: string;
  titleAddon?: React.ReactNode;
  descriptionAddon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  emptyStateIcon?: React.ReactNode | LucideIcon;
  emptyStateHeading?: string;
  isHoverEffect?: boolean;
  emptyStateMessage?: string | React.ReactNode;
  type?: 'graph' | 'info' | 'compact';
}

export default function UISectionCard({
  title,
  description,
  titleAddon,
  descriptionAddon,
  action,
  children,
  isHoverEffect = true,
  isLoading = false,
  emptyStateIcon,
  emptyStateHeading,
  emptyStateMessage,
  type = 'info',
}: InfoCardProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Section
      className={`w-full ${type === 'graph' ? 'bg-background' : ''} ${type === 'compact' ? 'border-0 shadow-none' : ''}`}
      onMouseEnter={() => setIsHover(true)}
      onFocus={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onBlur={() => setIsHover(false)}
    >
      <SectionHeader className={`${type === 'compact' ? 'p-0' : ''}`}>
        <SectionHeaderText>
          <SectionTitle
            className={`mb-1 flex items-center ${type === 'compact' ? 'text-md font-medium' : 'text-lg font-medium'}`}
          >
            {title} {titleAddon && <span>{titleAddon}</span>}
            <SectionActions>
              {action && (
                <div
                  className={`ml-4 flex-shrink-0 ${isHover || !isHoverEffect ? 'opacity-100' : 'opacity-0'} transition`}
                >
                  {action}
                </div>
              )}
            </SectionActions>
          </SectionTitle>
          <SectionDescription>
            <p className='max-w-4xl text-sm text-muted-foreground'>
              {description}
            </p>
            {descriptionAddon && (
              <span className='max-w-4xl'>{descriptionAddon}</span>
            )}
          </SectionDescription>
        </SectionHeaderText>
      </SectionHeader>

      <div className={`${type === 'compact' ? 'mt-2 p-0' : ''}`}>
        {isLoading ? (
          <Loader />
        ) : emptyStateHeading || emptyStateMessage ? (
          <EmptyState
            icon={emptyStateIcon as LucideIcon}
            header={emptyStateHeading}
            description={emptyStateMessage}
          />
        ) : (
          children
        )}
      </div>
    </Section>
  );
}
