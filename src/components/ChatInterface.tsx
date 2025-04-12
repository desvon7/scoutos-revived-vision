
import React from 'react';
import { Asterisk, User, SendHorizontal } from 'lucide-react';

const ChatInterface = () => {
  return (
    <div className="rounded-xl bg-black text-white border border-border/30 shadow-xl overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-neutral-800 p-1.5 rounded-full">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Bryan Chapell</span>
              <span>Today at 11:35 AM</span>
            </div>
            <p className="text-sm text-neutral-200">How do I add Scout to Swift?</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-white p-1.5 rounded-full">
            <Asterisk className="h-4 w-4 text-black" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>ScoutOS</span>
              <span>BOT • Today at 11:37 AM</span>
            </div>
            <div className="text-sm text-neutral-200">
              <p className="mb-2">To add our Scout SDKs to your Swift Stack, you can either:</p>
              <p className="mb-2">- Use Swift Package Manager by adding it to your dependencies in the Package.swift file</p>
              <p className="mb-2">- When deploy the finished app to our platforms, you'll be able to...</p>
              <p className="text-xs text-blue-400 mt-3 cursor-pointer">See more</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative border-t border-neutral-800">
        <input 
          type="text" 
          placeholder="Send message..." 
          className="w-full bg-neutral-900 px-4 py-3 pr-12 text-sm text-white placeholder:text-neutral-500 focus:outline-none" 
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <SendHorizontal className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
