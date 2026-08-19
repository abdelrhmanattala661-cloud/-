import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Breast Cancer', href: '/#information' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'About', href: '/#about' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-teal-700">
              <div className="bg-teal-50 p-2 rounded-lg">
                <Activity className="h-6 w-6" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-gray-900">MedAssistant</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-teal-700 font-medium transition-colors text-sm"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/chat"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
                location.pathname === '/chat' 
                  ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200" 
                  : "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
              )}
            >
              Ask AI
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 px-3">
              <Link
                to="/chat"
                className="block w-full text-center rounded-full bg-teal-600 px-4 py-3 text-base font-medium text-white hover:bg-teal-700"
                onClick={() => setIsOpen(false)}
              >
                Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
