import React, { useState } from 'react';
import { Citation } from '../types/chat';
import { FileText, ChevronDown, ChevronUp, ExternalLink, Library } from 'lucide-react';
import { cn } from '../lib/utils';

interface CitationCardProps {
  citation: Citation;
}

export function CitationCard({ citation }: CitationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-teal-200 transition-colors">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-3 flex items-start gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <div className="mt-0.5 bg-teal-100 p-1.5 rounded-md text-teal-700 shrink-0">
          <Library className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800 truncate">{citation.title}</h4>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
            {citation.organization && <span>{citation.organization}</span>}
            {citation.organization && citation.published_date && <span>•</span>}
            {citation.published_date && <span>{citation.published_date}</span>}
            {(citation.organization || citation.published_date) && citation.page && <span>•</span>}
            {citation.page && <span>Page {citation.page}</span>}
          </div>
        </div>
        <div className="text-slate-400 shrink-0">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 py-3 border-t border-slate-100 bg-white">
          <div className="flex items-start gap-2 mb-2">
            <FileText className="h-4 w-4 text-slate-400 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed">
              {citation.evidence || "No specific evidence excerpt provided."}
            </p>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">ID: {citation.document_id}</span>
            {citation.url && (
              <a 
                href={citation.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium"
              >
                View Source <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
