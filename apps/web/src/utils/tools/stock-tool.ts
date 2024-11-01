// https://js.langchain.com/v0.2/docs/integrations/tools/
import { DynamicTool } from '@langchain/core/tools';
import axios from 'axios';

import { ToolName } from '@/constants/tool-names';

export const stockTool = new DynamicTool({
  name: ToolName.STOCK_PRICE,
  description:
    'Get details for a stock ticker, including the current price, and the change in price.',
  func: async (ticker) => {
    const options = {
      method: 'GET',
      url: 'https://seeking-alpha.p.rapidapi.com/symbols/get-profile',
      params: { symbols: ticker },
      headers: {
        'x-rapidapi-key': '5e3d27ca1dmshda92cf5fbe1f0d8p13bc96jsn44a96db277b3',
        'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com',
      },
    };

    const response = await axios.request<{
      data: {
        id: string;
        attributes: {
          longDesc: string;
          companyName: string;
          sectorname: string;
          marketCap: number;
          lastDaily: {
            last: number;
            open: number;
            close: number;
            low: number;
            high: number;
            volume: number;
          };
        };
      }[];
    }>(options);

    const stockData = response.data.data.find((stock) => stock.id === ticker);

    if (!stockData) {
      throw new Error(`No data found for ticker: ${ticker}`);
    }

    return JSON.stringify(
      {
        ticker: stockData.id,
        companyName: stockData.attributes.companyName,
        sectorName: stockData.attributes.sectorname,
        marketCap: stockData.attributes.marketCap,
        stockPrice: stockData.attributes.lastDaily,
        volume: stockData.attributes.lastDaily.volume,
      },
      null,
      2,
    );
  },
});
