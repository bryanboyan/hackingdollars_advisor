import { Label, Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@purplefish/cascadia/components/ui/chart';

interface PortfolioChartProps {
  dataPoints: {
    value: number;
    ticker: string;
  }[];
  totalValue: number;
  currency: string;
}

export const PortfolioChart = ({
  dataPoints,
  totalValue,
  currency,
}: PortfolioChartProps) => {
  return (
    <ChartContainer config={{}} className="mx-auto aspect-square max-h-[300px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={dataPoints.map((stock, index) => {
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
                        currency,
                      }).format(totalValue)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Investments
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
  );
};
