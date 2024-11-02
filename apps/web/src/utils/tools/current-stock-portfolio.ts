// https://js.langchain.com/v0.2/docs/integrations/tools/
import { DynamicTool } from '@langchain/core/tools';

import { CURRENT_STOCK_PORTFOLIO } from '@/constants/portfolios';
import { ToolName } from '@/constants/tool-names';

export const currentStockPortfolioTool = new DynamicTool({
  name: ToolName.CURRENT_STOCK_PORTFOLIO,
  description:
    'Return the current stock porfolio (including the current price, number of shares, and total value).',
  func: async () => {
    return JSON.stringify(
      {
        currentPortfolio: CURRENT_STOCK_PORTFOLIO,
        totalValue: 2000000,
        currency: 'USD',
      },
      null,
      2,
    );
  },
});
