import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { useMemo } from 'react';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@purplefish/cascadia/components/ui/card';

interface StockPriceWidgetProps {
  toolOutput: string;
}

const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const StockPriceWidget = ({ toolOutput }: StockPriceWidgetProps) => {
  const data = useMemo(() => {
    try {
      const parsedToolOutput = JSON.parse(toolOutput);
      const typedToolOutput = z
        .object({
          ticker: z.string(),
          companyName: z.string(),
          sectorName: z.string(),
          marketCap: z.number(),
          stockPrice: z.object({
            last: z.number(),
            open: z.number(),
            close: z.number(),
            low: z.number(),
            high: z.number(),
          }),
          volume: z.number(),
        })
        .parse(parsedToolOutput);
      return typedToolOutput;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [toolOutput]);

  if (!data) return null;

  const currentPrice = data.stockPrice.last;
  const previousClose = data.stockPrice.open;
  const change = currentPrice - previousClose;
  const changePercent = (change / previousClose) * 100;
  const isPositive = change >= 0;

  return (
    <Card className="mb-2 w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">
          {data.ticker.toUpperCase()}
        </CardTitle>
        <CardDescription className="text-lg">
          {data.companyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold">
            {dollarFormatter.format(currentPrice)}
          </div>
          <div
            className={`flex items-center justify-center text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            {isPositive ? (
              <ArrowUpIcon className="mr-1 size-5" />
            ) : (
              <ArrowDownIcon className="mr-1 size-5" />
            )}
            <span className="font-semibold">
              {change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-base">
          <div>
            <p className="mb-1 text-muted-foreground">Open</p>
            <p className="font-medium">
              {dollarFormatter.format(data.stockPrice.open)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">High</p>
            <p className="font-medium">
              {dollarFormatter.format(data.stockPrice.high)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Low</p>
            <p className="font-medium">
              {dollarFormatter.format(data.stockPrice.low)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Volume</p>
            <p className="font-medium">
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 1,
              }).format(data.volume)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-muted-foreground">Market Cap</p>
            <p className="font-medium">
              {new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0,
                style: 'currency',
                currency: 'USD',
              }).format(data.marketCap)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
