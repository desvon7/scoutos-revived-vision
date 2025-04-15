import { NodeObject } from '../types';
import { NodeExecution } from './types';

export class InputNode implements NodeExecution {
  constructor(private node: NodeObject) {}

  async execute(input: any) {
    return input;
  }
}

export class LLMNode implements NodeExecution {
  constructor(private node: NodeObject) {}

  async execute(input: any) {
    const model = this.node.data?.model || 'gpt-4';
    const temp = this.node.data?.temperature || 0.7;

    console.log(`Running LLM with model ${model} at temp ${temp}`);

    // Simulate a delay for processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return `Processed by ${model}: ${input}`;
  }
}

export const createNodeExecutor = (node: NodeObject): NodeExecution => {
  switch (node.type) {
    case 'input':
      return new InputNode(node);
    case 'llm':
      return new LLMNode(node);
    default:
      return {
        execute: async (input: any) => {
          console.log(`Default execution for node type: ${node.type}`);
          return input;
        },
      };
  }
};
