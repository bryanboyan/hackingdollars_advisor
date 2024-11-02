import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@purplefish/cascadia/utils/cn';

interface MessageProps {
  messageType: 'prompt' | 'response';
  messageText: string;
}

export const Message = ({ messageType, messageText }: MessageProps) => {
  return (
    <div className="mb-2">
      <span
        className={cn(
          'inline-block rounded-lg p-2',
          messageType === 'prompt' ? 'bg-primary text-white' : 'bg-secondary',
        )}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{messageText}</Markdown>
      </span>
    </div>
  );
};
