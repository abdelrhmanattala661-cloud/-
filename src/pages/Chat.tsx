import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Activity, ShieldAlert } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { ChatMessage } from '../components/ChatMessage';
import { MessageInput } from '../components/MessageInput';
import { SuggestedQuestions } from '../components/SuggestedQuestions';
import { Message, Conversation } from '../types/chat';
import { api } from '../lib/api';

export function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Sync messages when changing conversation
  useEffect(() => {
    if (currentConversationId) {
      const conv = conversations.find(c => c.id === currentConversationId);
      if (conv) {
        setMessages(conv.messages);
      }
    } else {
      setMessages([]);
    }
  }, [currentConversationId, conversations]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      // Simulate streaming start
      const tempAssistantId = `msg-${Date.now() + 1}`;
      setMessages(prev => [...prev, {
        id: tempAssistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      }]);

      const response = await api.chat({
        question: text,
        conversation_id: currentConversationId || undefined
      });

      const assistantMessage: Message = {
        id: tempAssistantId,
        role: 'assistant',
        content: response.answer,
        citations: response.citations,
        timestamp: new Date(),
        isStreaming: false
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);

      // Update or create conversation
      setConversations(prev => {
        const existingIdx = prev.findIndex(c => c.id === response.conversation_id);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            updatedAt: new Date(),
            messages: finalMessages
          };
          return updated;
        } else {
          const newConv: Conversation = {
            id: response.conversation_id,
            title: text.length > 30 ? text.substring(0, 30) + '...' : text,
            updatedAt: new Date(),
            messages: finalMessages
          };
          setCurrentConversationId(newConv.id);
          return [newConv, ...prev];
        }
      });

    } catch (err) {
      setError("Unable to connect to the medical assistant right now. Please try again.");
      setMessages(newMessages); // Remove the temp streaming message
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setError(null);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar 
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onNewConversation={startNewConversation}
        onClearHistory={() => {
          setConversations([]);
          setCurrentConversationId(null);
          setMessages([]);
        }}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2 text-teal-700">
            <Activity className="h-5 w-5" />
            <span className="font-semibold text-lg">MedAssistant</span>
          </div>
          <div className="w-10"></div> {/* spacer */}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col">
              {/* Desktop Logo Area */}
              <div className="hidden md:flex items-center justify-between p-6">
                <Link to="/" className="flex items-center gap-2 text-teal-700 hover:opacity-80 transition-opacity">
                  <Activity className="h-6 w-6" />
                  <span className="font-semibold text-xl tracking-tight text-gray-900">MedAssistant</span>
                </Link>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
                  Evidence-based AI
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <SuggestedQuestions onSelect={(q) => handleSendMessage(q)} />
              </div>
            </div>
          ) : (
            <div className="pb-32">
              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4">
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
                <button 
                  onClick={() => handleSendMessage()} 
                  className="text-sm font-medium text-red-700 hover:text-red-800 shrink-0"
                >
                  Try Again
                </button>
              </div>
            )}
            
            <MessageInput 
              input={input}
              setInput={setInput}
              onSubmit={() => handleSendMessage()}
              isLoading={isLoading}
            />
            
            <p className="text-center text-xs text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
              Medical information provided by this assistant is for educational purposes only and does not replace professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
