oimport React, { useState } from 'react';
import { FORMULA_MASTER_SHEET } from '../data/highSchoolData';
import { Sparkles, Search, Copy, Check, Layers, RotateCw, BookOpen } from 'lucide-react';

export const FormulaMaster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['ALL', ...Array.from(new Set(FORMULA_MASTER_SHEET.map((f) => f.category)))];

  const filteredFormulas = FORMULA_MASTER_SHEET.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const currentFlashcard = filteredFormulas[cardIndex] || filteredFormulas[0];

  return (
    <section className="py-10 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 font-devanagari">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
          <img
            src="/src/assets/images/banner_math_formulas_1793808209097.jpg"
            alt="Math Banner"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>सूत्र मास्टर एवं क्विक रिवीज़न (Class 10 Formula Cheat Sheet)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            गणित, भौतिकी एवं रसायन सूत्र संग्रह
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            कक्षा 10वीं बोर्ड परीक्षा के सभी महत्वपूर्ण सूत्रों, समीकरणों और सिद्धांतों का एक स्थान पर त्वरित रिवीज़न।
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setFlashcardMode(!flashcardMode)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <Layers className="w-4 h-4" />
              <span>{flashcardMode ? 'ग्रिड सूची देखें' : 'फ़्लैशकार्ड मोड (Memory Test)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'सभी सूत्र' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCardIndex(0);
              setIsFlipped(false);
            }}
            placeholder="सूत्र या नाम खोजें..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
          />
        </div>
      </div>

      {/* Flashcard Practice Mode */}
      {flashcardMode && currentFlashcard ? (
        <div className="max-w-xl mx-auto space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-slate-900 border-2 border-amber-500/40 hover:border-amber-400 rounded-2xl p-8 min-h-[260px] flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-300 relative group"
          >
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
              {currentFlashcard.category}
            </span>

            <span className="absolute top-4 right-4 text-xs text-slate-400 flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>कार्ड पलटने के लिए क्लिक करें</span>
            </span>

            {!isFlipped ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 uppercase tracking-wider">सूत्र का नाम (Concept Name)</p>
                <h3 className="text-2xl font-bold text-white">{currentFlashcard.name}</h3>
                <p className="text-xs text-amber-400 pt-2">(सूत्र याद करें और कार्ड पलटें)</p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">गणितीय व्यंजक (Formula Solution)</p>
                <div className="text-xl sm:text-2xl font-mono font-extrabold text-amber-300 bg-slate-950 px-6 py-3 rounded-xl border border-slate-800">
                  {currentFlashcard.formula}
                </div>
                <p className="text-xs text-slate-300">{currentFlashcard.note}</p>
              </div>
            )}
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <button
              onClick={() => {
                setCardIndex((prev) => (prev > 0 ? prev - 1 : filteredFormulas.length - 1));
                setIsFlipped(false);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold"
            >
              ← पिछला
            </button>
            <span>
              कार्ड {cardIndex + 1} / {filteredFormulas.length}
            </span>
            <button
              onClick={() => {
                setCardIndex((prev) => (prev + 1 < filteredFormulas.length ? prev + 1 : 0));
                setIsFlipped(false);
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-bold"
            >
              अगला →
            </button>
          </div>
        </div>
      ) : (
        /* Grid List View */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFormulas.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 relative group shadow-md"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <button
                  onClick={() => handleCopy(item.formula, idx)}
                  className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white transition-colors border border-slate-800"
                  title="Copy formula"
                >
                  {copiedIdx === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-100">{item.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.note}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-center text-sm font-bold text-amber-300">
                {item.formula}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
