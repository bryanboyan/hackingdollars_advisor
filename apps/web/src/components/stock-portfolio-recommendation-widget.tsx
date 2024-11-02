import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@purplefish/cascadia/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@purplefish/cascadia/components/ui/chart';

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
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data.recommendedPortfolio.map((stock, index) => {
                const colorIndex = index % 5;
                const fill = `hsl(var(--chart-${colorIndex + 1}))`;

                return {
                  value: stock.value,
                  ticker: stock.ticker,
                  fill,
                };
              })}
              dataKey="value"
              nameKey="ticker"
              innerRadius={80}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: data.currency,
                          }).format(data.totalValue)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
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
