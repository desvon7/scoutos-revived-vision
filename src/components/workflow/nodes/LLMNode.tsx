import React, { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeProps, NodeData, LLMNodeType } from '../types';
import { cn } from '@/lib/utils';

interface LLMConfig {
  model: LLMNodeType;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  userPrompt: string;
  streaming: boolean;
  contextWindow: number;
  stopSequences: string[];
}

export const LLMNode: React.FC<NodeProps> = (props) => {
  const [config, setConfig] = useState<LLMConfig>({
    model: props.data.config?.model || 'gpt-4',
    temperature: props.data.config?.temperature || 0.7,
    maxTokens: props.data.config?.maxTokens || 2000,
    systemPrompt: props.data.config?.systemPrompt || '',
    userPrompt: props.data.config?.userPrompt || '',
    streaming: props.data.config?.streaming || false,
    contextWindow: props.data.config?.contextWindow || 8000,
    stopSequences: props.data.config?.stopSequences || [],
  });

  const handleConfigChange = (updates: Partial<LLMConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    props.onUpdate({
      config: newConfig,
    });
  };

  const renderModelSelector = () => (
    <select
      value={config.model}
      onChange={(e) => handleConfigChange({ model: e.target.value as LLMNodeType })}
      className="model-selector"
    >
      <option value="gpt-4">GPT-4</option>
      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
      <option value="claude-3-opus">Claude 3 Opus</option>
      <option value="claude-3-sonnet">Claude 3 Sonnet</option>
      <option value="claude-3-haiku">Claude 3 Haiku</option>
      <option value="anthropic">Anthropic</option>
      <option value="gemini-pro">Gemini Pro</option>
      <option value="gemini-ultra">Gemini Ultra</option>
      <option value="mistral">Mistral</option>
      <option value="llama-2">LLaMA 2</option>
      <option value="custom-llm">Custom LLM</option>
    </select>
  );

  const renderParameterControls = () => (
    <div className="parameter-controls">
      <div className="parameter-group">
        <label>Temperature</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={config.temperature}
          onChange={(e) => handleConfigChange({ temperature: parseFloat(e.target.value) })}
        />
        <span>{config.temperature}</span>
      </div>
      <div className="parameter-group">
        <label>Max Tokens</label>
        <input
          type="number"
          min="1"
          max={config.contextWindow}
          value={config.maxTokens}
          onChange={(e) => handleConfigChange({ maxTokens: parseInt(e.target.value) })}
        />
      </div>
      <div className="parameter-group">
        <label>Streaming</label>
        <input
          type="checkbox"
          checked={config.streaming}
          onChange={(e) => handleConfigChange({ streaming: e.target.checked })}
        />
      </div>
    </div>
  );

  const renderPromptEditors = () => (
    <div className="prompt-editors">
      <div className="prompt-group">
        <label>System Prompt</label>
        <textarea
          value={config.systemPrompt}
          onChange={(e) => handleConfigChange({ systemPrompt: e.target.value })}
          placeholder="Enter system prompt..."
        />
      </div>
      <div className="prompt-group">
        <label>User Prompt</label>
        <textarea
          value={config.userPrompt}
          onChange={(e) => handleConfigChange({ userPrompt: e.target.value })}
          placeholder="Enter user prompt..."
        />
      </div>
    </div>
  );

  return (
    <BaseNode {...props}>
      <div className="llm-node-content">
        {renderModelSelector()}
        {renderParameterControls()}
        {renderPromptEditors()}
      </div>
    </BaseNode>
  );
};
