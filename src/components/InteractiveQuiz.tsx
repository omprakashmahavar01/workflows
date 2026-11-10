oimport React, { useState } from 'react';
import { HIGH_SCHOOL_SUBJECTS } from '../data/highSchoolData';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Brain, Loader2, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface InteractiveQuizProps {
  initialSubject?: string;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ initialSubject }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject || 'maths');
  const [activeQuizTitle, setActiveQuizTitle] = useState<string>('कक्षा 10वीं बोर्ड परीक्षा प्रैक्टिस टेस्ट');
  
  // Quiz Questions Pool
  const subjectObj = HIGH_SCHOOL_SUBJECTS.find((s) => s.id === selectedSubject) || HIGH_SCHOOL_SUBJECTS[0];
  const defaultQuestions: Question[] = subjectObj.chapters.flatMap((c) =>
    c.mcqs.map((m, idx) => ({
      id: idx + 1,
      question: m.question,
      options: m.options,
      correctIndex: m.correct,
      explanation: m.explanation,
    }))
  );

  const [questions, setQuestions] = useState<Question[]>(defaultQuestions.length > 0 ? defaultQuestions : [
    {
      id: 1,
      question: 'द्विघात समीकरण ax² + bx + c = 0 का विविक्तकर (Discriminant) क्या होता है?',
      options: ['b² - 4ac', 'b² + 4ac', '2a - b', '4ac - b²'],
      correctIndex: 0,
      explanation: 'विविक्तकर का सूत्र D = b² - 4ac होता है।'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // Generate Custom AI Quiz via Backend `/api/gemini/quiz`
  const generateAiQuiz = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subjectObj.name,
          chapter: subjectObj.chapters[0]?.title || 'समग्र अभ्यास',
          count: 5,
        }),
      });

      const data = await res.json();
      if (res.ok && data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setActiveQuizTitle(`AI जनरेटेड क्विज़: ${data.quizTitle || subjectObj.name}`);
        handleRestartQuiz();
      } else {
        alert('AI क्विज़ तैयार नहीं हो सका। डिफ़ॉल्ट प्रश्नों का उपयोग किया जा रहा है।');
      }
    } catch (err) {
      alert('सर्वर एरर। डिफ़ॉल्ट प्रश्न लोड हो रहे हैं।');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section className="py-10 px-4 lg:px-8 max-w-4xl mx-auto space-y-8 font-devanagari">
      {/* Quiz Header & Subject Filter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>कक्षा 10वीं मॉक टेस्ट मॉडल</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{activeQuizTitle}</h2>
          </div>

          <button
            onClick={generateAiQuiz}
            disabled={isAiLoading}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shrink-0 disabled:opacity-50"
          >
            {isAiLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Brain className="w-4 h-4 text-cyan-200" />
            )}
            <span>नया AI क्विज़ बनाएं</span>
          </button>
        </div>

        {/* Subject Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {HIGH_SCHOOL_SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubject(sub.id);
                const qPool = sub.chapters.flatMap((c) =>
                  c.mcqs.map((m, idx) => ({
                    id: idx + 1,
                    question: m.question,
                    options: m.options,
                    correctIndex: m.correct,
                    explanation: m.explanation,
                  }))
                );
                if (qPool.length > 0) setQuestions(qPool);
                setActiveQuizTitle(`क्विज़: ${sub.name}`);
                handleRestartQuiz();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedSubject === sub.id
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Quiz Body */}
        {!quizCompleted ? (
          <div className="space-y-6 pt-2">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                प्रश्न <strong className="text-amber-400">{currentIndex + 1}</strong> / {questions.length}
              </span>
              <span>स्कोर: <strong className="text-emerald-400">{score}</strong></span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

                  if (selectedOption !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {selectedOption !== null && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box when option chosen */}
              {selectedOption !== null && (
                <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1 animate-in fade-in">
                  <span className="font-bold text-amber-400 block">स्पष्टीकरण (Explanation):</span>
                  <p className="leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-40"
              >
                <span>{currentIndex + 1 === questions.length ? 'परिणाम देखें' : 'अगला प्रश्न'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Score Result View */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-xl">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">क्विज़ पूरा हुआ!</h3>
              <p className="text-sm text-slate-300">
                आपने <strong className="text-amber-400">{questions.length}</strong> में से{' '}
                <strong className="text-emerald-400">{score}</strong> प्रश्न सही किए।
              </p>
            </div>

            <div className="max-w-xs mx-auto p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">सफलता दर (Accuracy)</div>
              <div className="text-2xl font-bold text-amber-400 font-mono-num">
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>पुनः प्रयास करें</span>
              </button>

              <button
                onClick={generateAiQuiz}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>नया AI टेस्ट लें</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
