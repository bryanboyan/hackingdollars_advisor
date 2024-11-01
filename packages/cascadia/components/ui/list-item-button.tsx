import { cn } from '../../utils/cn';

export interface ListItemButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ListItemButton = ({
  children,
  className,
  ...props
}: ListItemButtonProps) => (
  <button
    type="button"
    className={cn(
      'w-full text-start hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
