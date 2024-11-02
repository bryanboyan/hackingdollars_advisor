'use client';

import {
  ArrowUpRight,
  DollarSign,
  PiggyBank,
  ShoppingCart,
} from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@purplefish/cascadia/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@purplefish/cascadia/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@purplefish/cascadia/components/ui/chart';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@purplefish/cascadia/components/ui/tabs';

import { Chatbot } from '@/components/chatbot';
import { PortfolioChart } from '@/components/portfolio-chart';
import { CURRENT_STOCK_PORTFOLIO } from '@/constants/portfolios';

// Mock data for charts
const spendData = [
  { name: 'Housing', value: 1500 },
  { name: 'Food', value: 500 },
  { name: 'Transportation', value: 300 },
  { name: 'Entertainment', value: 200 },
  { name: 'Others', value: 500 },
];

const Component = () => {
  return (
    <div className="mx-auto flex h-screen w-screen flex-col overflow-hidden bg-background">
      <header className="bg-primary p-4 text-primary-foreground">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold">Boyan Lin</h1>
            <p className="text-sm">Financial Dashboard</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 gap-4 overflow-hidden p-4">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-8">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Assets
                    </p>
                    <p className="text-lg font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(2000000)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Net Growth</p>
                    <p className="text-lg font-bold">+8.2%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="invest">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invest">Investments</TabsTrigger>
              <TabsTrigger value="spend">Monthly Spend</TabsTrigger>
            </TabsList>
            <TabsContent value="spend">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                  <CardDescription>
                    Your spending breakdown for this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      spend: {
                        label: 'Spend',
                        color: 'hsl(var(--chart-1))',
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={spendData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {spendData.map((entry, index) => {
                            const colorIndex = index % 5;
                            const fill = `hsl(var(--chart-${colorIndex + 1}))`;

                            return <Cell key={`cell-${index}`} fill={fill} />;
                          })}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="invest">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Portfolio</CardTitle>
                  <CardDescription>
                    Your current investment allocation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PortfolioChart
                    dataPoints={CURRENT_STOCK_PORTFOLIO}
                    currency="USD"
                    totalValue={2000000}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Financial Well-being Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <PiggyBank className="text-primary" />
                  <span>Increase your savings rate by 5%</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShoppingCart className="text-primary" />
                  <span>Cut down on non-essential expenses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ArrowUpRight className="text-primary" />
                  <span>Consider diversifying your investment portfolio</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="flex h-full flex-col">
          <CardHeader>
            <CardTitle>Financial Coach Chat</CardTitle>
          </CardHeader>
          <Chatbot />
        </Card>
      </main>
    </div>
  );
};

export default Component;
