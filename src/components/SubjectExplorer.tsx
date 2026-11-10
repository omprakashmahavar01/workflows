iimport React, { useState } from 'react';
import { HIGH_SCHOOL_SUBJECTS, Subject, Chapter } from '../data/highSchoolData';
import { BookOpen, ChevronRight, CheckCircle2, Star, HelpCircle, Brain, Play, Sparkles } from 'lucide-react';

interface SubjectExplorerProps {
  selectedSubjectId: string;
  onSelectSubject: (id: string) => void;
  onOpenAiGuruWithTopic: (subject: string, chapter: string) => void;
  onStartQuizForChapter: (subject: string, chapter: string) => void;
}

export const SubjectExplorer: React.FC<SubjectExplorerProps> = ({
  selectedSubjectId,
  onSelectSubject,
  onOpenAiGuruWithTopic,
  onStartQuizForChapter,
}) => {
  const currentSubject: Subject =
    HIGH_SCHOOL_SUBJECTS.find((s) => s.id === selectedSubjectId) || HIGH_SCHOOL_SUBJECTS[0];

  const [activeChapterId, setActiveChapterId] = useState<string>(
    currentSubject.chapters[0]?.id || ''
  );

  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});

  const activeChapter: Chapter | undefined =
    currentSubject.chapters.find((c) => c.id === activeChapterId) || currentSubject.chapters[0];

  const toggleAnswer = (index: number) => {
    setExpandedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="py-10 px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Subject Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {HIGH_SCHOOL_SUBJECTS.map((sub) => {
          const isActive = sub.id === currentSubject.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                onSelectSubject(sub.id);
                setActiveChapterId(sub.chapters[0]?.id || '');
              }}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 flex items-center gap-2 border ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chapter Split View */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Chapter List */}
        <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="px-2 py-1 flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              {currentSubject.name} - अध्याय (Chapters)
            </h3>
            <span className="text-xs text-amber-400 font-mono-num font-semibold">
              {currentSubject.chapters.length} अध्याय
            </span>
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {currentSubject.chapters.map((chapter) => {
              const isSelected = chapter.id === activeChapter?.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapterId(chapter.id);
                    setExpandedAnswers({});
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/50 shadow-md text-amber-300'
                      : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {chapter.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs sm:text-sm line-clamp-1">
                      {chapter.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {chapter.titleEn}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 my-auto shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Selected Chapter Detailed Notes & V.I.P Questions */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
          {activeChapter ? (
            <>
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                    <span>अध्याय {activeChapter.number}</span>
                    <span>•</span>
                    <span>{currentSubject.name}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-devanagari">
                    {activeChapter.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{activeChapter.titleEn}</p>
                </div>

                {/* Quick Chapter Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      onOpenAiGuruWithTopic(currentSubject.name, activeChapter.title)
                    }
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span>AI गुरुजी से पूछें</span>
                  </button>

                  <button
                    onClick={() =>
                      onStartQuizForChapter(currentSubject.name, activeChapter.title)
                    }
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>क्विज़ शुरू करें</span>
                  </button>
                </div>
              </div>

              {/* Chapter Summary */}
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>अध्याय सारांश (Chapter Summary)</span>
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {activeChapter.summary}
                </p>
              </div>

              {/* Key Concept Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>मुख्य बिंदु एवं अवधारणाएँ (Key Concept Points)</span>
                </h4>

                <div className="space-y-2">
                  {activeChapter.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula List if available */}
              {activeChapter.formulas && activeChapter.formulas.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>महत्वपूर्ण सूत्र एवं समीकरण (Key Formulas)</span>
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeChapter.formulas.map((form, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-950/80 rounded-xl border border-amber-500/20 space-y-1.5"
                      >
                        <span className="text-[11px] font-bold text-amber-300 block">
                          {form.name}
                        </span>
                        <div className="font-mono text-sm font-bold text-white bg-slate-900 p-2 rounded border border-slate-800 text-center">
                          {form.formula}
                        </div>
                        <p className="text-[11px] text-slate-400">{form.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5-Star V.I.P Important Board Questions */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>बोर्ड परीक्षा V.I.P प्रश्न एवं हल (5-Star Questions)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">उत्तर देखने के लिए क्लिक करें</span>
                </div>

                <div className="space-y-3">
                  {activeChapter.importantQuestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleAnswer(idx)}
                        className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="p-1 rounded bg-amber-500/20 text-amber-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                            Q{idx + 1}
                          </span>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                              {item.q}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                              <span className="text-amber-400 font-mono-num font-bold">
                                [{item.marks} अंक]
                              </span>
                              {item.isVip && (
                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                                  ★ VIP 2026 प्रश्न
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="text-xs text-cyan-400 hover:underline shrink-0 font-medium">
                          {expandedAnswers[idx] ? 'छिपाएं ▲' : 'उत्तर देखें ▼'}
                        </span>
                      </button>

                      {expandedAnswers[idx] && (
                        <div className="p-4 bg-slate-900/90 border-t border-slate-800/80 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-devanagari">
                          <div className="font-bold text-emerald-400 text-xs mb-1">
                            हल एवं स्पष्टीकरण (Solution & Answer):
                          </div>
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400">कृपया एक अध्याय का चयन करें।</div>
          )}
        </div>
      </div>
    </section>
  );
};
