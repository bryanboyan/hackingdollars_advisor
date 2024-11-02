// https://js.langchain.com/v0.2/docs/integrations/tools/
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import type { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createReactAgent } from 'langchain/agents';
import { pull } from 'langchain/hub';

import { env } from '@/env.mjs';
import { calculationTool } from '@/utils/tools/calculation-tool';
import { currentStockPortfolioTool } from '@/utils/tools/current-stock-portfolio';
import { stockPortfolioRecommendationTool } from '@/utils/tools/stock-portfolio-recommendation';
import { stockTool } from '@/utils/tools/stock-tool';
import { weatherTool } from '@/utils/tools/weather-tool';

const tools = [
  stockTool,
  calculationTool,
  weatherTool,
  currentStockPortfolioTool,
  stockPortfolioRecommendationTool,
  new TavilySearchResults({
    maxResults: 1,
    apiKey: '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',
  }),
  new WikipediaQueryRun({
    topKResults: 3,
    maxDocContentLength: 4000,
  }),
];

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  apiKey: env.OPENAI_API_KEY,
});

let cachedAgentExecutor: AgentExecutor | null = null;

const getAgentExecutorAsync = async () => {
  if (cachedAgentExecutor) {
    return cachedAgentExecutor;
  }

  // Get the prompt to use - you can modify this!
  // If you want to see the prompt in full, you can at:
  // https://smith.langchain.com/hub/purplefish/fix-tool
  const prompt = await pull<PromptTemplate>('purplefish/fix-tool');

  const agent = await createReactAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
    returnIntermediateSteps: true,
  });

  cachedAgentExecutor = agentExecutor;

  return cachedAgentExecutor;
};

export const getResponseAsync = async (
  input: string,
  opts?: {
    chatHistory: (HumanMessage | AIMessage)[];
  },
) => {
  try {
    const agentExecutor = await getAgentExecutorAsync();

    const result = (await agentExecutor.invoke({
      input,
      chat_history: opts?.chatHistory,
    })) as {
      input: string;
      output: string;
      intermediateSteps?: {
        action: {
          tool: string;
          toolInput: string;
          log: string;
        };
        observation: string;
      }[];
    };

    const lastIntermediateStep =
      result.intermediateSteps?.[result.intermediateSteps.length - 1];

    return {
      output: result.output,
      toolName: lastIntermediateStep?.action.tool,
      toolInput: lastIntermediateStep?.observation,
    };
  } catch (err) {
    console.error(err);
    return {
      output: 'Sorry, I encountered an error. Please try again.',
    };
  }
};
