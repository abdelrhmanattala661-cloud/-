import React from 'react';
import { Plus, MessageSquare, Search, Settings, Trash2, X } from 'lucide-react';
import { Conversation } from '../types/chat';
import { cn } from '../lib/utils';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onClearHistory: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onClearHistory,
  isMobileOpen,
  onCloseMobile
}: SidebarProps) {
  
  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-40 w-72 bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
    isMobileOpen ? "translate-x-0" : "-translate-x-full"
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-30 md:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <div className={sidebarClasses}>
        <div className="p-4 flex items-center justify-between md:block">
          <button
            onClick={() => {
              onNewConversation();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-700 px-4 py-3 rounded-xl font-medium transition-all shadow-sm"
          >
            <Plus className="h-5 w-5" />
            New Conversation
          </button>
          
          <button 
            onClick={onCloseMobile}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-200 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white border border-slate-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            History
          </h3>
          <div className="space-y-1">
            {conversations.length === 0 ? (
              <div className="px-3 py-4 text-sm text-slate-500 text-center">
                No conversation history
              </div>
            ) : (
              conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onCloseMobile();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors",
                    currentConversationId === conv.id
                      ? "bg-teal-50 text-teal-900 font-medium"
                      : "text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />
                  <span className="truncate">{conv.title}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 space-y-1">
          <button 
            onClick={() => {
              onClearHistory();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-200 transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </div>
    </>
  );
}
