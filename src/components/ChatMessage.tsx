import React from 'react';
import { Message } from '../types/chat';
import { User, Activity, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import { CitationCard } from './CitationCard';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === 'assistant';

  return (
    <div className={cn(
      "w-full py-8 border-b border-slate-100",
      isAI ? "bg-slate-50/50" : "bg-white"
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6">
        <div className="shrink-0">
          {isAI ? (
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-600/20">
              <Activity className="h-6 w-6" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600">
              <User className="h-6 w-6" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-slate-900">
              {isAI ? 'Medical Assistant' : 'You'}
            </span>
            {isAI && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wide text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3" /> AI Generated
              </span>
            )}
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-700">
            {message.isStreaming && !message.content ? (
              <div className="flex items-center gap-2 text-slate-400 font-medium animate-pulse">
                Analyzing medical evidence...
              </div>
            ) : (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            )}
          </div>

          {message.citations && message.citations.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                Sources & Evidence
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {message.citations.map((citation, idx) => (
                  <CitationCard key={idx} citation={citation} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
