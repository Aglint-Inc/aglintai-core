import {END} from '@langchain/langgraph';

export const members = ['get_word_length'];
export const options = [END, ...members];

// Define the routing function
const functionDef = {
  name: 'route',
  description: 'Select the next role.',
  parameters: {
    title: 'routeSchema',
    type: 'object',
    properties: {
      next: {
        title: 'Next',
        anyOf: [{enum: options}],
      },
    },
    required: ['next'],
  },
};

export const toolDef = {
  type: 'function',
  function: functionDef,
} as const;
