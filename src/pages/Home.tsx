import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Stethoscope, BookOpen, Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-gray-100">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-teal-500"></span>
                Evidence-Based Information
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Trusted Breast Cancer Information, <span className="text-teal-600">Powered by AI</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                Ask questions about breast cancer and receive evidence-based information supported by trusted medical sources.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-8 py-4 text-base font-medium text-white hover:bg-teal-700 shadow-sm shadow-teal-600/20 transition-all hover:-translate-y-0.5"
                >
                  Ask a Question
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#information"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-8 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Learn About Breast Cancer
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How Our Assistant Works</h2>
              <p className="text-lg text-slate-600">We combine advanced AI with rigorous medical guidelines to provide reliable information.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="h-6 w-6 text-teal-600" />,
                  title: "Evidence-Based",
                  description: "Every answer is grounded in established medical guidelines and published literature."
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-teal-600" />,
                  title: "Transparent Sources",
                  description: "We provide exact citations and page numbers so you can verify the information yourself."
                },
                {
                  icon: <Clock className="h-6 w-6 text-teal-600" />,
                  title: "Available 24/7",
                  description: "Get answers to your questions anytime, supporting your journey with accessible knowledge."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <div className="bg-teal-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 text-teal-700 mb-6">
            <Stethoscope className="h-6 w-6" />
            <span className="font-semibold text-xl">MedAssistant</span>
          </div>
          <p className="text-slate-500 max-w-2xl mx-auto mb-6">
            Medical information provided by this assistant is for educational purposes only and does not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} MedAssistant AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
