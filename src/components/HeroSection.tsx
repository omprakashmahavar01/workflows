oimport React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Award, Clock, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { HIGH_SCHOOL_SUBJECTS } from '../data/highSchoolData';

interface HeroSectionProps {
  onSelectSubject: (subjectId: string) => void;
  onOpenAiGuru: () => void;
  onSelectQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectSubject,
  onOpenAiGuru,
  onSelectQuiz,
}) => {
  // Exam Countdown calculation
  const [timeLeft, setTimeLeft] = useState({ days: 112, hours: 14, mins: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1 };
        return { ...prev, mins: 59, hours: prev.hours > 0 ? prev.hours - 1 : 23 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800">
      {/* Background Image with Dark Gradient Scrim */}
      <div className="absolute inset-0 z-0 opacity-25 dark:opacity-20">
        <img
          src="/src/assets/images/hero_high_school_study_1793808209153.jpg"
          alt="High School Study Environment"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>कक्षा 10वीं बोर्ड परीक्षा लक्ष्य 95%+ अंक</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-devanagari">
              हाई स्कूल बोर्ड परीक्षा की{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
                सम्पूर्ण तैयारी
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              UP Board, CBSE एवं स्टेट बोर्ड परीक्षा के लिए गणित, विज्ञान, सामाजिक विज्ञान, हिंदी व अंग्रेजी के सम्पूर्ण अध्यायवार नोट्स, सूत्र, V.I.P प्रश्न एवं AI गुरुजी डाउट सॉल्वर।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAiGuru}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 text-sm sm:text-base group"
              >
                <Brain className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
                <span>AI गुरुजी से डाउट पूछें</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onSelectQuiz}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-100 font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all text-sm sm:text-base flex items-center gap-2"
              >
                <Award className="w-5 h-5 text-amber-400" />
                <span>अध्यायवार क्विज़ टेस्ट</span>
              </button>
            </div>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% एनसीईआरटी (NCERT) पाठ्यक्रम</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2026 नवीनतम पैटर्न मॉडल पेपर</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 AI शंका समाधान</span>
              </div>
            </div>
          </div>

          {/* Right Column: Board Exam Countdown & Progress Widget */}
          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">बोर्ड परीक्षा उल्टी गिनती</h3>
                  <p className="text-xs text-slate-400">Class 10 Board Exam Countdown</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 text-xs font-mono font-bold">
                Target 95%+
              </span>
            </div>

            {/* Countdown Box */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono-num">
                  {timeLeft.days}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">दिन (Days)</div>
              </div>
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono-num">
                  {timeLeft.hours}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">घंटे (Hours)</div>
              </div>
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono-num">
                  {timeLeft.mins}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">मिनट (Mins)</div>
              </div>
            </div>

            {/* Preparation Strategy Progress */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">तैयारी प्रगति (Study Readiness)</span>
                <span className="text-emerald-400 font-bold font-mono-num">78% Complete</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 h-2.5 rounded-full"
                  style={{ width: '78%' }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                सुझाव: आज ही गणित के 2 अध्याय एवं विज्ञान के रासायनिक समीकरण रिवीज़ करें।
              </p>
            </div>
          </div>
        </div>

        {/* Subject Cards Strip */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span>कक्षा 10वीं विषय चुनें (Select Subject)</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {HIGH_SCHOOL_SUBJECTS.map((subject) => (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className={`p-4 rounded-xl text-left bg-gradient-to-br ${subject.bgGradient} bg-slate-900/90 hover:bg-slate-800/90 border transition-all duration-200 group hover:-translate-y-1 shadow-md`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-2 rounded-lg bg-slate-950/60 ${subject.color}`}>
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono-num font-semibold">
                    {subject.totalChapters} अध्याय
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {subject.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{subject.nameEn}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
