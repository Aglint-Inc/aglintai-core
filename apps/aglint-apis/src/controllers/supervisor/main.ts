import {HumanMessage} from '@langchain/core/messages';
import {START, StateGraph} from '@langchain/langgraph';
import {Request, Response} from 'express';
import {JsonOutputToolsParser} from 'langchain/output_parsers';
import {helloNode} from './nodes/hello';
import {members, toolDef} from './utils/const';
import {agentStateChannels, AgentStateChannels} from './utils/initiate';
import {llm} from './utils/llm';
import {formattedPrompt} from './utils/promptsupervisor';

export async function agentSupervisor(req: Request, res: Response) {
  const {input} = req.body;

  const supervisorChain = (await formattedPrompt())
    .pipe(
      llm.bindTools([toolDef], {
        tool_choice: {type: 'function', function: {name: 'route'}},
      })
    )
    .pipe(new JsonOutputToolsParser())
    .pipe(x => x[0].args);

  // 1. Create the graph
  const workflow = new StateGraph<AgentStateChannels, unknown, string>({
    channels: agentStateChannels,
  }) // 2. Add the nodes; these will do the work
    .addNode('hello', helloNode)
    .addNode('supervisor', supervisorChain);
  // 3. Define the edges. We will define both regular and conditional ones
  // After a worker completes, report to supervisor
  members.forEach(member => {
    workflow.addEdge(member, 'supervisor');
  });

  workflow.addConditionalEdges('supervisor', (x: AgentStateChannels) => x.next);

  workflow.addEdge(START, 'supervisor');

  const graph = workflow.compile();

  const streamResults = graph.stream(
    {
      messages: [
        new HumanMessage({
          content: input,
        }),
      ],
    },
    {recursionLimit: 100}
  );

  let results = [];

  for await (const output of await streamResults) {
    if (!output?.__end__) {
      results.push(output);
      console.log(JSON.stringify(output, null, 2));
      console.log('----');
    }
  }

  return res.status(200).json({data: results});
}
