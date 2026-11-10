iimport React from 'react';
import { Sparkles, Download, Moon, Sun, UserCheck, User } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiGuru: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userName: string;
  isAuthenticated: boolean;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiGuru,
  isDarkMode,
  toggleDarkMode,
  userName,
  isAuthenticated,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('home');
          }}
          className="text-lg lg:text-xl font-bold tracking-tight text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="bg-amber-500/20 text-amber-400 p-1.5 rounded-lg border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </span>
          HighSchool Taiyar
        </a>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'home'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent hover:text-slate-100'
            }`}
          >
            अध्ययन सामग्री
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'quiz'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent hover:text-slate-100'
            }`}
          >
            क्विज़ बैंक
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'formulas'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent hover:text-slate-100'
            }`}
          >
            सूत्र मास्टर
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activeTab === 'papers'
                ? 'text-amber-400 border-amber-400 font-semibold'
                : 'border-transparent hover:text-slate-100'
            }`}
          >
            मॉडल पेपर
          </button>
          <button
            onClick={onOpenAiGuru}
            className="text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 py-1 font-semibold flex items-center gap-1.5"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            AI गुरुजी
          </button>
        </nav>

        {/* Zone 3: Clean Private Profile Button + Theme Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl transition-all flex items-center gap-2 text-xs font-semibold shrink-0"
            title="Student Profile"
          >
            {isAuthenticated ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline font-medium text-slate-200">{userName}</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-slate-200">छात्र प्रोफ़ाइल</span>
              </>
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/60 rounded-lg border border-slate-700/60 transition-colors"
            title="Theme switch"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Android APK Studio
          </button>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around mt-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'home' ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400'
          }`}
        >
          नोट्स
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'quiz' ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400'
          }`}
        >
          क्विज़
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'formulas' ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400'
          }`}
        >
          सूत्र
        </button>
        <button
          onClick={() => setActiveTab('papers')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'papers' ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-slate-400'
          }`}
        >
          मॉडल पेपर
        </button>
        <button
          onClick={onOpenAiGuru}
          className="whitespace-nowrap px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 font-semibold"
        >
          AI गुरु
        </button>
      </div>
    </header>
  );
};
