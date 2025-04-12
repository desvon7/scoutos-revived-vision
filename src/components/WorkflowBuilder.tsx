
import React from 'react';

const WorkflowBuilder = () => {
  return (
    <div className="rounded-xl bg-black p-4 border border-border/30 shadow-xl overflow-hidden">
      <div className="relative">
        <svg width="100%" height="300" viewBox="0 0 600 280" className="mx-auto">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Nodes */}
          <g transform="translate(100, 80)">
            <rect width="90" height="40" rx="4" fill="#222" stroke="#444" />
            <text x="45" y="25" textAnchor="middle" fill="white" fontSize="12">Slack</text>
          </g>
          
          <g transform="translate(260, 80)">
            <rect width="90" height="40" rx="4" fill="#222" stroke="#444" />
            <text x="45" y="25" textAnchor="middle" fill="white" fontSize="12">Memory</text>
          </g>
          
          <g transform="translate(500, 80)">
            <rect width="90" height="40" rx="4" fill="#222" stroke="#444" />
            <text x="45" y="25" textAnchor="middle" fill="white" fontSize="12">Check</text>
          </g>
          
          <g transform="translate(260, 150)">
            <rect width="90" height="40" rx="4" fill="#222" stroke="#444" />
            <text x="45" y="25" textAnchor="middle" fill="white" fontSize="12">Collection</text>
          </g>
          
          <g transform="translate(380, 220)">
            <rect width="90" height="40" rx="4" fill="#222" stroke="#444" />
            <text x="45" y="25" textAnchor="middle" fill="white" fontSize="12">LLM</text>
          </g>
          
          {/* Connections */}
          <path d="M 190 100 L 260 100" stroke="#666" strokeWidth="1.5" />
          <path d="M 350 100 L 500 100" stroke="#666" strokeWidth="1.5" />
          <path d="M 545 120 L 545 170 L 350 170" stroke="#666" strokeWidth="1.5" />
          <path d="M 305 190 L 305 220 L 380 220" stroke="#666" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
