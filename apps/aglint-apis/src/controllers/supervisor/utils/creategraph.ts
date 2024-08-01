import {JsonOutputToolsParser} from 'langchain/output_parsers';
import {llm} from './llm';
import {formattedPrompt} from './promptsupervisor';
import {toolDef} from './const';

export const supervisorChain = async () => {
  return (await formattedPrompt())
    .pipe(
      llm.bindTools([toolDef], {
        tool_choice: {type: 'function', function: {name: 'route'}},
      })
    )
    .pipe(new JsonOutputToolsParser())
    .pipe(x => x[0].args);
};
