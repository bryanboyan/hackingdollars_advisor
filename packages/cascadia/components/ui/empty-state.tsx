import type { LucideIcon } from 'lucide-react';

import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  iconClassName?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  iconClassName,
}: EmptyStateProps) => {
  const Icon = icon;

  return (
    <div className="flex flex-col items-center px-4 py-12 text-center text-muted-foreground">
      <Icon className={cn('size-28', iconClassName)} />
      <p className="mt-6 text-3xl font-medium tracking-tight">{title}</p>
      {description && <p className="text-base tracking-tight">{description}</p>}
    </div>
  );
};
