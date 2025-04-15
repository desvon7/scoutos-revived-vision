import { NodeType, NodeObject, NodeData } from '../types';
import { getNodeComponent, getNodeConfig, getNodeInputs, getNodeOutputs } from './registry';
import { v4 as uuidv4 } from 'uuid';

export class NodeFactory {
  static createNode(type: NodeType, position: { x: number; y: number }, data?: Partial<NodeData>): NodeObject {
    const defaultConfig = getNodeConfig(type);
    const defaultInputs = getNodeInputs(type);
    const defaultOutputs = getNodeOutputs(type);

    const nodeData: NodeData = {
      category: data?.category || 'llm',
      type,
      inputs: data?.inputs || defaultInputs,
      outputs: data?.outputs || defaultOutputs,
      config: { ...defaultConfig, ...(data?.config || {}) },
      state: 'idle',
      metadata: {
        version: '1.0.0',
        ...(data?.metadata || {}),
      },
    };

    return {
      id: uuidv4(),
      title: this.getDefaultTitle(type),
      type,
      category: nodeData.category,
      x: position.x,
      y: position.y,
      data: nodeData,
      width: 200,
      height: 100,
      selected: false,
      dragging: false,
      zIndex: 1,
      position: {
        x: position.x,
        y: position.y,
      },
    };
  }

  static getDefaultTitle(type: NodeType): string {
    const titles: Record<NodeType, string> = {
      'gpt-4': 'GPT-4',
      'gpt-3.5-turbo': 'GPT-3.5 Turbo',
      'claude-3-opus': 'Claude 3 Opus',
      'claude-3-sonnet': 'Claude 3 Sonnet',
      'claude-3-haiku': 'Claude 3 Haiku',
      'anthropic': 'Anthropic',
      'gemini-pro': 'Gemini Pro',
      'gemini-ultra': 'Gemini Ultra',
      'mistral': 'Mistral',
      'llama-2': 'LLaMA 2',
      'custom-llm': 'Custom LLM',
      'text-input': 'Text Input',
      'url-input': 'URL Input',
      'json-input': 'JSON Input',
      'file-upload': 'File Upload',
      'webhook-trigger': 'Webhook Trigger',
      'schedule-trigger': 'Schedule Trigger',
      'api-trigger': 'API Trigger',
      'collection-query': 'Collection Query',
      'collection-save': 'Collection Save',
      'collection-update': 'Collection Update',
      'collection-delete': 'Collection Delete',
      'vector-query': 'Vector Query',
      'vector-save': 'Vector Save',
      'text-splitter': 'Text Splitter',
      'text-formatter': 'Text Formatter',
      'text-extractor': 'Text Extractor',
      'html-to-text': 'HTML to Text',
      'markdown-to-html': 'Markdown to HTML',
      'conditional': 'Conditional',
      'switch': 'Switch',
      'loop': 'Loop',
      'merge': 'Merge',
      'map': 'Map',
      'filter': 'Filter',
      'delay': 'Delay',
      'http-request': 'HTTP Request',
      'api-connection': 'API Connection',
      'email-sender': 'Email Sender',
      'slack-integration': 'Slack Integration',
      'discord-integration': 'Discord Integration',
      'json-transform': 'JSON Transform',
      'csv-parser': 'CSV Parser',
      'data-mapping': 'Data Mapping',
      'javascript': 'JavaScript',
      'python': 'Python',
      'shell': 'Shell',
      'web-search': 'Web Search',
      'web-scraper': 'Web Scraper',
      'serp-results': 'SERP Results',
    };

    return titles[type] || type;
  }

  static createNodeFromTemplate(template: NodeObject): NodeObject {
    return this.createNode(template.type, { x: template.x, y: template.y }, template.data);
  }

  static updateNode(node: NodeObject, updates: Partial<NodeObject>): NodeObject {
    return {
      ...node,
      ...updates,
      data: {
        ...node.data,
        ...(updates.data || {}),
      },
    };
  }
} 