import { NodeType } from '../../types';

export function getNodeDefaultTitle(type: NodeType): string {
  const titles: Record<NodeType, string> = {
    text_input: 'Text Input',
    url_input: 'URL Input',
    json_input: 'JSON Input',
    file_upload: 'File Upload',
    gpt_4: 'GPT-4',
    gpt_35_turbo: 'GPT-3.5 Turbo',
    javascript: 'JavaScript',
    python: 'Python',
    condition: 'Condition',
    loop: 'Loop',
    output: 'Output',
    stream_output: 'Stream Output',
    api: 'API',
    webhook: 'Webhook',
  };

  return titles[type] || type;
}
