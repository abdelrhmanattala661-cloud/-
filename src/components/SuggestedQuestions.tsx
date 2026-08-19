import React from 'react';
import { HelpCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  const suggestions = [
    "What are the early symptoms of breast cancer?",
    "Who should get a screening mammogram?",
    "What are the main risk factors for breast cancer?",
    "What does HER2-positive mean in breast cancer?",
    "What are the different stages of breast cancer?",
    "What are the most common breast cancer treatments?"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">How can I help you today?</h2>
        <p className="text-slate-500 max-w-lg">
          Ask any question about breast cancer, screening, diagnosis, or treatment. Our assistant uses evidence-based medical guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {suggestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(question)}
            className="text-left px-5 py-4 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-sm transition-all text-sm font-medium text-slate-700 group"
          >
            {question}
            <span className="block text-xs text-slate-400 mt-1 font-normal group-hover:text-teal-600 transition-colors">
              Click to ask
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
