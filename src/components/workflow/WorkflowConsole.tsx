import React, { useRef, useEffect } from 'react';
import { ExecutionState, LogEntry } from './types';
import { useWorkflowStore } from './store';

const WorkflowConsole: React.FC = () => {
  const { executionLogs, clearLogs } = useWorkflowStore();
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs appear
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [executionLogs]);

  const getLogColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info':
        return 'text-gray-300';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-700 h-48 flex flex-col">
      <div className="px-4 py-2 border-b border-gray-700 flex items-center justify-between">
        <div className="text-gray-400 font-medium">Console</div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white" onClick={clearLogs}>
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-sm">
        {executionLogs.length === 0 ? (
          <div className="px-4 py-2 text-gray-500 italic">No logs to display</div>
        ) : (
          executionLogs.map((log, index) => (
            <div key={index} className={`px-4 py-1 ${getLogColor(log.level)}`}>
              <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
              <span className="font-medium mr-2">{log.level.toUpperCase()}:</span>
              {log.message}
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};

export default WorkflowConsole;
