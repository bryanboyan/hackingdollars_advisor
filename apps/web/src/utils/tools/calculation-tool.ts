// https://js.langchain.com/v0.2/docs/integrations/tools/
import { DynamicTool } from '@langchain/core/tools';
import { evaluate } from 'mathjs';

import { ToolName } from '@/constants/tool-names';

export const calculationTool = new DynamicTool({
  name: ToolName.CALCULATION,
  description:
    'Parse mathematical expressions and return the calculated result. Supports numbers, bignumbers, bigints, complex numbers, fractions, units, strings, arrays, and matrices.',
  func: async (expressions) => {
    return String(evaluate(expressions));
  },
});
