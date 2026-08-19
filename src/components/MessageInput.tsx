import React, { useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { cn } from '../lib/utils';

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function MessageInput({ input, setInput, onSubmit, isLoading }: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative flex items-end w-full bg-white border border-slate-300 shadow-sm rounded-2xl focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all overflow-hidden">
      <div className="flex flex-col w-full">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about breast cancer..."
          className="w-full max-h-[200px] bg-transparent border-0 resize-none px-4 py-4 focus:ring-0 text-slate-900 placeholder:text-slate-400"
          rows={1}
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button 
              type="button" 
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Attach document (Coming soon)"
              disabled={isLoading}
            >
              <Paperclip className="h-5 w-5" />
            </button>
            <button 
              type="button" 
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Voice input (Coming soon)"
              disabled={isLoading}
            >
              <Mic className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={onSubmit}
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-2 rounded-xl flex items-center justify-center transition-all",
              input.trim() && !isLoading
                ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
