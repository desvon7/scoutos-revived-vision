import { v4 as uuidv4 } from 'uuid';
import { Node, NodeType, Port, DataType } from '../types/nodes';

class NodeFactory {
  createNode(type: NodeType, position: { x: number, y: number }): Node {
    const id = uuidv4();
    const inputs: Port[] = [];
    const outputs: Port[] = [];
    const config: Record<string, any> = {};

    // Configure inputs and outputs based on node type
    switch (type) {
      case 'text_input':
        outputs.push({
          id: uuidv4(),
          name: 'text',
          dataType: DataType.STRING
        });
        config.text = '';
        break;

      case 'gpt_4':
        inputs.push({
          id: uuidv4(),
          name: 'prompt',
          dataType: DataType.STRING
        });
        outputs.push({
          id: uuidv4(),
          name: 'response',
          dataType: DataType.STRING
        });
        config.model = 'gpt-4';
        config.temperature = 0.7;
        break;

      case 'api':
        inputs.push({
          id: uuidv4(),
          name: 'input',
          dataType: DataType.ANY
        });
        outputs.push({
          id: uuidv4(),
          name: 'response',
          dataType: DataType.ANY
        });
        config.url = '';
        config.method = 'GET';
        break;

      case 'condition':
        inputs.push({
          id: uuidv4(),
          name: 'condition',
          dataType: DataType.BOOLEAN
        });
        outputs.push(
          {
            id: uuidv4(),
            name: 'true',
            dataType: DataType.ANY
          },
          {
            id: uuidv4(),
            name: 'false',
            dataType: DataType.ANY
          }
        );
        break;

      case 'transform':
        inputs.push({
          id: uuidv4(),
          name: 'input',
          dataType: DataType.ANY
        });
        outputs.push({
          id: uuidv4(),
          name: 'output',
          dataType: DataType.ANY
        });
        config.transform = '';
        break;

      case 'output':
        inputs.push({
          id: uuidv4(),
          name: 'input',
          dataType: DataType.ANY
        });
        break;
    }

    return {
      id,
      type,
      position,
      data: {
        inputs,
        outputs,
        config
      }
    };
  }
}

const nodeFactory = new NodeFactory();
export default nodeFactory; 