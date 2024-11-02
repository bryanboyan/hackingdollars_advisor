'use client';

import {
  BanknoteIcon,
  BotIcon,
  type LucideIcon,
  RefreshCwIcon,
  SendIcon,
} from 'lucide-react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Button } from '@purplefish/cascadia/components/ui/button';
import { Input } from '@purplefish/cascadia/components/ui/input';
import { ScrollArea } from '@purplefish/cascadia/components/ui/scroll-area';

import { CurrentStockPortfolioWidget } from '@/components/current-stock-portfolio-widget';
import { Message } from '@/components/message';
import { StockPortfolioRecommendationWidget } from '@/components/stock-portfolio-recommendation-widget';
import { StockPriceWidget } from '@/components/stock-price-widget';
import { WeatherWidget } from '@/components/weather-widget';
import { ToolName } from '@/constants/tool-names';
import { trpcClient } from '@/trpc-client';

const suggestions: {
  prompt: string;
  Icon: LucideIcon;
}[] = [
  { prompt: 'What is the stock price of AAPL?', Icon: BanknoteIcon },
  { prompt: 'What is my current stock portfolio?', Icon: BanknoteIcon },
  { prompt: 'What is my largest stock investment?', Icon: BanknoteIcon },
  {
    prompt: 'Do you have recommendations on what stocks to buy?',
    Icon: BanknoteIcon,
  },
];

export const Chatbot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const { data, refetch } = trpcClient.chatMessage.getAll.useQuery();

  const { mutate: send } = trpcClient.chatMessage.send.useMutation({
    onMutate() {
      setIsLoading(true);
    },
    onSuccess() {
      setIsLoading(false);
      setPrompt('');
      refetch();
    },
    onError() {
      setIsLoading(false);
      setPrompt('');
      refetch();
    },
  });

  const { mutate: deleteAll } = trpcClient.chatMessage.deleteAll.useMutation({
    onSuccess() {
      refetch();
    },
    onError() {
      refetch();
    },
  });

  const hasMessages = data?.chatMessages && data?.chatMessages.length > 0;

  return (
    <div className="flex h-full w-[600px] flex-col gap-4 overflow-hidden">
      <ScrollArea className="grow rounded-md px-8">
        {!hasMessages && !isLoading && (
          <div>
            <BotIcon className="mx-auto my-8 size-36" />

            <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-4 lg:flex-row">
              {suggestions.map((suggestion) => (
                <div key={suggestion.prompt} className="w-full">
                  <Button
                    variant="outline"
                    className="size-full flex-col items-start justify-start gap-2 text-start"
                    onClick={() => {
                      setPrompt(suggestion.prompt);
                      send({ prompt: suggestion.prompt });
                    }}
                  >
                    <suggestion.Icon className="mr-2 size-6" />
                    {suggestion.prompt}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.chatMessages.map((message) => (
          <Fragment key={message.id}>
            <Message messageType="prompt" messageText={message.prompt} />
            {message.response && (
              <Message messageType="response" messageText={message.response} />
            )}
            {message.toolName === ToolName.STOCK_PRICE &&
              message.toolOutput && (
                <StockPriceWidget toolOutput={message.toolOutput} />
              )}
            {message.toolName === ToolName.WEATHER && message.toolOutput && (
              <WeatherWidget toolOutput={message.toolOutput} />
            )}
            {message.toolName === ToolName.CURRENT_STOCK_PORTFOLIO &&
              message.toolOutput && (
                <CurrentStockPortfolioWidget toolOutput={message.toolOutput} />
              )}
            {message.toolName === ToolName.STOCK_PORTFOLIO_RECOMMENDATION &&
              message.toolOutput && (
                <StockPortfolioRecommendationWidget
                  toolOutput={message.toolOutput}
                />
              )}
          </Fragment>
        ))}
        {isLoading && (
          <>
            <Message messageType="prompt" messageText={prompt} />
            <RefreshCwIcon className="my-4 size-8 animate-spin" />
          </>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isLoading) {
            send({ prompt });
          }
        }}
        className="flex gap-2 px-8 py-4"
      >
        <Button
          variant="outline"
          onClick={() => {
            deleteAll();
          }}
        >
          Reset
        </Button>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <RefreshCwIcon className="mr-2 size-4 animate-spin" />
          ) : (
            <SendIcon className="mr-2 size-4" />
          )}
          Send
        </Button>
      </form>
    </div>
  );
};
