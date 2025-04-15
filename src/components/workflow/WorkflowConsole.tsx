import React, { useState, useRef, useEffect } from 'react';
import { ExecutionState, ConsoleMessage } from './types';
import { useWorkflowStore } from './store';

const WorkflowConsole: React.FC = () => {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'output' | 'logs' | 'variables'>('output');
  const [filter, setFilter] = useState<string>('');
  const [executionState, setExecutionState] = useState<ExecutionState>(ExecutionState.IDLE);
  
  const { workflow, selectedNode } = useWorkflowStore();
  const consoleEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Add a new message to the console
  const addMessage = (level: 'info' | 'debug' | 'warn' | 'error', message: string, nodeId?: string, data?: any) => {
    const newMessage: ConsoleMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date(),
      level,
      message,
      nodeId,
      data,
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  // Clear the console
  const clearConsole = () => {
    setMessages([]);
  };
  
  // Toggle console visibility
  const toggleConsole = () => {
    setIsOpen(!isOpen);
  };
  
  // Filter messages
  const filteredMessages = messages.filter(msg => {
    if (!filter) return true;
    
    return (
      msg.message.toLowerCase().includes(filter.toLowerCase()) ||
      (msg.nodeId && msg.nodeId.toLowerCase().includes(filter.toLowerCase()))
    );
  });
  
  // Start workflow execution
  const startExecution = () => {
    clearConsole();
    setExecutionState(ExecutionState.RUNNING);
    addMessage('info', 'Workflow execution started', undefined, {
      workflowId: workflow.id,
      timestamp: new Date(),
    });
    
    // Simulate workflow execution
    // In a real implementation, this would call the workflow engine
    setTimeout(() => {
      addMessage('info', 'Processing input data', workflow.nodes[0]?.id);
      
      setTimeout(() => {
        addMessage('debug', 'Data transformation complete', workflow.nodes[1]?.id);
        
        setTimeout(() => {
          addMessage('info', 'Calling LLM API', workflow.nodes[2]?.id);
          
          setTimeout(() => {
            addMessage('info', 'Received LLM response', workflow.nodes[2]?.id, {
              tokens: 150,
              model: 'gpt-4',
              responseTime: '1.2s',
            });
            
            setTimeout(() => {
              addMessage('info', 'Workflow execution completed successfully');
              setExecutionState(ExecutionState.COMPLETED);
            }, 800);
          }, 2000);
        }, 1000);
      }, 800);
    }, 500);
  };
  
  // Stop workflow execution
  const stopExecution = () => {
    addMessage('warn', 'Workflow execution stopped by user');
    setExecutionState(ExecutionState.IDLE);
  };
  
  // Get syntax highlighting based on the data type
  const getSyntaxHighlighting = (data: any) => {
    if (typeof data === 'string') {
      return <span className="text-green-400">{`"${data}"`}</span>;
    } else if (typeof data === 'number') {
      return <span className="text-blue-400">{data}</span>;
    } else if (typeof data === 'boolean') {
      return <span className="text-yellow-400">{data.toString()}</span>;
    } else if (data === null) {
      return <span className="text-gray-400">null</span>;
    } else if (Array.isArray(data)) {
      return (
        <span>
          [
          {data.map((item, i) => (
            <span key={i}>
              {getSyntaxHighlighting(item)}
              {i < data.length - 1 ? ', ' : ''}
            </span>
          ))}
          ]
        </span>
      );
    } else if (typeof data === 'object') {
      return (
        <span>
          {'{'}
          {Object.entries(data).map(([key, value], i, arr) => (
            <span key={key} className="ml-2">
              <span className="text-purple-400">{key}</span>: {getSyntaxHighlighting(value)}
              {i < arr.length - 1 ? ', ' : ''}
            </span>
          ))}
          {'}'}
        </span>
      );
    }
    
    return <span>{String(data)}</span>;
  };
  
  return (
    <div className="workflow-console">
      {/* Console header */}
      <div className="console-header flex items-center justify-between bg-gray-900 border-t border-gray-700 px-4 py-2">
        <div className="flex items-center">
          <button
            className="text-gray-400 hover:text-white mr-2"
            onClick={toggleConsole}
          >
            {isOpen ? '▼' : '▲'}
          </button>
          <h3 className="text-white font-medium">Console</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Execution controls */}
          {executionState === ExecutionState.IDLE && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              onClick={startExecution}
            >
              ▶ Run
            </button>
          )}
          
          {executionState === ExecutionState.RUNNING && (
            <>
              <button
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                onClick={() => {}}
              >
                ⏸ Pause
              </button>
              
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                onClick={stopExecution}
              >
                ⏹ Stop
              </button>
            </>
          )}
          
          {/* Clear button */}
          <button
            className="text-gray-400 hover:text-white"
            onClick={clearConsole}
          >
            Clear
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="console-content bg-gray-900 text-white h-64 overflow-y-auto">
          {/* Console tabs */}
          <div className="console-tabs flex border-b border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'output'
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('output')}
            >
              Output
            </button>
            
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'logs'
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('logs')}
            >
              Logs
            </button>
            
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'variables'
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('variables')}
            >
              Variables
            </button>
            
            {/* Filter input */}
            <div className="ml-auto px-2 flex items-center">
              <input
                type="text"
                placeholder="Filter..."
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          
          {/* Console content */}
          <div className="p-4">
            {activeTab === 'output' && (
              <div className="console-messages font-mono text-sm">
                {filteredMessages.length === 0 ? (
                  <div className="text-gray-500 italic">No output messages yet. Run your workflow to see results here.</div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-2 ${
                        msg.level === 'error'
                          ? 'text-red-400'
                          : msg.level === 'warn'
                          ? 'text-yellow-400'
                          : msg.level === 'debug'
                          ? 'text-gray-400'
                          : 'text-white'
                      }`}
                    >
                      <span className="text-gray-500">
                        [{msg.timestamp.toLocaleTimeString()}]
                      </span>
                      {msg.nodeId && (
                        <span className="ml-2 text-blue-400">[{msg.nodeId}]</span>
                      )}
                      <span className="ml-2">{msg.message}</span>
                      
                      {msg.data && (
                        <div className="ml-4 mt-1 text-xs bg-gray-800 p-2 rounded">
                          {getSyntaxHighlighting(msg.data)}
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={consoleEndRef} />
              </div>
            )}
            
            {activeTab === 'logs' && (
              <div className="logs-content font-mono text-sm">
                {/* Logs content would go here */}
                <div className="text-gray-500 italic">Log messages would appear here.</div>
              </div>
            )}
            
            {activeTab === 'variables' && (
              <div className="variables-content font-mono text-sm">
                {/* Variables content would go here */}
                <div className="text-gray-500 italic">Workflow variables would appear here.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowConsole; 