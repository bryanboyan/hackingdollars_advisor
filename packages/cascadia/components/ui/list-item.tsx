import { cn } from '../../utils/cn';

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ListItem = ({ className, ...props }: ListItemProps) => (
  <div className={cn('flex gap-x-2 px-4 py-3', className)} {...props} />
);

interface ListItemTextProps extends React.HTMLAttributes<HTMLDivElement> {
  primary?: React.ReactNode;
  primaryClassName?: string;
  secondary?: React.ReactNode;
  secondaryClassName?: string;
}
export const ListItemText = ({
  children,
  className,
  primary,
  primaryClassName,
  secondary,
  secondaryClassName,
  ...props
}: ListItemTextProps) => (
  <div
    {...props}
    className={cn('flex flex-1 items-center overflow-hidden', className)}
  >
    <div className="w-full overflow-hidden">
      {primary && (
        <p className={cn('text-sm leading-5', primaryClassName)}>{primary}</p>
      )}
      {secondary && (
        <p
          className={cn(
            'mt-1 text-sm leading-5 text-muted-foreground',
            secondaryClassName,
          )}
        >
          {secondary}
        </p>
      )}
      {children}
    </div>
  </div>
);

interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ListItemAction = ({
  className,
  ...props
}: ListItemActionProps) => (
  <div className={cn('flex items-center', className)} {...props} />
);
