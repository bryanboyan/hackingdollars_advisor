import { useMemo } from 'react';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@purplefish/cascadia/components/ui/card';

import { PortfolioChart } from '@/components/portfolio-chart';

interface StockPortfolioRecommendationProps {
  toolOutput: string;
}

export const StockPortfolioRecommendationWidget = ({
  toolOutput,
}: StockPortfolioRecommendationProps) => {
  const data = useMemo(() => {
    try {
      const parsedToolOutput = JSON.parse(toolOutput);
      const typedToolOutput = z
        .object({
          currentPortfolio: z.array(
            z.object({
              ticker: z.string(),
              company: z.string(),
              sector: z.string(),
              shares: z.number(),
              purchasePricePerShare: z.number(),
              currentPricePerShare: z.number(),
              value: z.number(),
            }),
          ),
          recommendedPortfolio: z.array(
            z.object({
              ticker: z.string(),
              company: z.string(),
              sector: z.string(),
              shares: z.number(),
              purchasePricePerShare: z.number(),
              currentPricePerShare: z.number(),
              value: z.number(),
            }),
          ),
          totalValue: z.number(),
          currency: z.string(),
        })
        .parse(parsedToolOutput);
      return typedToolOutput;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [toolOutput]);

  if (!data) return null;

  return (
    <Card className="flex w-fit flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock Portfolio Recommendation</CardTitle>
        <CardDescription>
          {new Date().toLocaleString('default', { month: 'long' })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PortfolioChart
          dataPoints={data.recommendedPortfolio}
          totalValue={data.totalValue}
          currency={data.currency}
        />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Portfolio Recommendation
        </div>
        <div className="leading-none text-muted-foreground">
          Show how you should adjust your portfolio to maximize returns.
        </div>
      </CardFooter>
    </Card>
  );
};
