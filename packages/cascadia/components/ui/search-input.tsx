import { SearchIcon, XIcon } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '../../utils/cn';
import { Input, type InputProps } from './input';

export interface SearcInputProps extends InputProps {
  inputClassName?: string;
  clearButtonLabel?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearcInputProps>(
  ({ inputClassName, clearButtonLabel, className, ...inputProps }, ref) => {
    // https://mtsknn.fi/blog/react-fallback-ref/#useimperativehandle
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const clear = () => {
      if (!inputRef.current) {
        return;
      }
      const descriptor = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      );
      if (descriptor && descriptor.set) {
        descriptor.set.call(inputRef.current, '');
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    };

    return (
      <div className={cn('relative isolate w-full', className)}>
        <span
          role="presentation"
          className="absolute inset-y-0 left-0 z-0 flex aspect-square cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
          onClick={() => inputRef.current?.focus()}
        >
          <SearchIcon className="size-4" />
        </span>

        <Input
          {...inputProps}
          ref={inputRef}
          className={cn('z-10 px-10', inputClassName)}
        />
        {inputProps.value && (
          <button
            aria-label={clearButtonLabel}
            type="button"
            className="absolute inset-y-0 right-0 z-20 flex aspect-square cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={clear}
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
