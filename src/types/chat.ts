export interface Citation {
  document_id: string;
  title: string;
  organization?: string;
  published_date?: string;
  page?: number;
  chunk_id?: string;
  evidence?: string;
  url?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: Date;
  messages: Message[];
}
