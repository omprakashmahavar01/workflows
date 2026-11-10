import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SubjectExplorer } from './components/SubjectExplorer';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { FormulaMaster } from './components/FormulaMaster';
import { ModelPaperViewer } from './components/ModelPaperViewer';
import { AndroidStudioStudio } from './components/AndroidStudioStudio';
import { AiGuruJiModal } from './components/AiGuruJiModal';
import { PhoneAuthModal } from './components/PhoneAuthModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths');
  const [isAiGuruOpen, setIsAiGuruOpen] = useState(false);
  const [aiGuruTopic, setAiGuruTopic] = useState<{ subject?: string; chapter?: string }>({});
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Authenticated Profile State (Private / Confidential)
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('user_name') || 'छात्र प्रोफ़ाइल';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleOpenAiGuruWithTopic = (subject: string, chapter: string) => {
    setAiGuruTopic({ subject, chapter });
    setIsAiGuruOpen(true);
  };

  const handleStartQuizForChapter = (subject: string, chapter: string) => {
    setActiveTab('quiz');
  };

  const handleLoginSuccess = (phone: string, name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    localStorage.setItem('user_name', name);
    localStorage.setItem('is_authenticated', 'true');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiGuru={() => {
          setAiGuruTopic({});
          setIsAiGuruOpen(true);
        }}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        userName={userName}
        isAuthenticated={isAuthenticated}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onSelectSubject={(subId) => {
                setSelectedSubjectId(subId);
                const el = document.getElementById('subject-explorer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAiGuru={() => {
                setAiGuruTopic({});
                setIsAiGuruOpen(true);
              }}
              onSelectQuiz={() => setActiveTab('quiz')}
            />

            <div id="subject-explorer">
              <SubjectExplorer
                selectedSubjectId={selectedSubjectId}
                onSelectSubject={setSelectedSubjectId}
                onOpenAiGuruWithTopic={handleOpenAiGuruWithTopic}
                onStartQuizForChapter={handleStartQuizForChapter}
              />
            </div>
          </>
        )}

        {activeTab === 'quiz' && <InteractiveQuiz initialSubject={selectedSubjectId} />}

        {activeTab === 'formulas' && <FormulaMaster />}

        {activeTab === 'papers' && <ModelPaperViewer />}

        {activeTab === 'apk' && <AndroidStudioStudio />}
      </main>

      {/* AI Guru Ji Modal */}
      <AiGuruJiModal
        isOpen={isAiGuruOpen}
        onClose={() => setIsAiGuruOpen(false)}
        initialSubject={aiGuruTopic.subject}
        initialChapter={aiGuruTopic.chapter}
      />

      {/* Phone Authentication Modal */}
      <PhoneAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
