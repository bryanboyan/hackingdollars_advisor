// https://js.langchain.com/v0.2/docs/integrations/tools/
import { DynamicTool } from '@langchain/core/tools';

import {
  CURRENT_STOCK_PORTFOLIO,
  RECOMMENDED_STOCK_PORTFOLIO,
} from '@/constants/portfolios';
import { ToolName } from '@/constants/tool-names';

export const stockPortfolioRecommendationTool = new DynamicTool({
  name: ToolName.STOCK_PORTFOLIO_RECOMMENDATION,
  description:
    'Return the stock portfolio that is recommended  (including the current price, number of shares, and total value).',
  func: async () => {
    return JSON.stringify(
      {
        currentPortfolio: CURRENT_STOCK_PORTFOLIO,
        recommendedPortfolio: RECOMMENDED_STOCK_PORTFOLIO,
        totalValue: 2000000,
        currency: 'USD',
      },
      null,
      2,
    );
  },
});
