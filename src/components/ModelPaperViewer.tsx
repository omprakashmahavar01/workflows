iimport React, { useState } from 'react';
import { BOARD_MODEL_PAPERS } from '../data/highSchoolData';
import { FileText, Clock, Award, CheckCircle, Download, BookOpen, ChevronRight } from 'lucide-react';

export const ModelPaperViewer: React.FC = () => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(BOARD_MODEL_PAPERS[0].id);

  const paper = BOARD_MODEL_PAPERS.find((p) => p.id === selectedPaperId) || BOARD_MODEL_PAPERS[0];

  return (
    <section className="py-10 px-4 lg:px-8 max-w-5xl mx-auto space-y-8 font-devanagari">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>कक्षा 10वीं बोर्ड मॉडल प्रश्न-पत्र (Sample Papers 2026)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          2026 बोर्ड परीक्षा नवीनतम ब्लूप्रिंट एवं मॉडल पेपर
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          UP Board, CBSE एवं स्टेट बोर्ड के नवीनतम पैटर्न (70 अंक लिखित + 30 अंक प्रयोगात्मक/प्रोजेक्ट) पर आधारित मॉडल प्रश्न-पत्र।
        </p>

        {/* Paper Selector Tabs */}
        <div className="flex items-center gap-3 pt-2">
          {BOARD_MODEL_PAPERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPaperId(p.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                selectedPaperId === p.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              {p.subject} ({p.year})
            </button>
          ))}
        </div>
      </div>

      {/* Selected Model Paper Layout */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Paper Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800/80 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block">बोर्ड (Board)</span>
            <span className="text-xs font-bold text-amber-400">{paper.board}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">पूर्णांक (Total Marks)</span>
            <span className="text-xs font-bold text-emerald-400 font-mono-num">{paper.totalMarks} अंक</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">समय (Time)</span>
            <span className="text-xs font-bold text-slate-200">{paper.time}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">मॉडल वर्ष</span>
            <span className="text-xs font-bold text-cyan-400">{paper.year}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
          {paper.description}
        </p>

        {/* Sections Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>प्रश्न-पत्र संरचना एवं अंक विभाजन (Blueprint Breakdown)</span>
          </h3>

          <div className="space-y-3">
            {paper.sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-slate-900 text-amber-400 text-xs font-mono font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {sec.name}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono-num text-xs font-bold shrink-0 border border-emerald-500/20">
                  {sec.marks} अंक
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Exam Instructions Box */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-amber-400">परीक्षार्थियों के लिए सामान्य निर्देश:</h4>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
            <li>प्रारंभ के 15 मिनट परीक्षार्थियों को प्रश्न-पत्र पढ़ने के लिए निर्धारित हैं।</li>
            <li>सभी प्रश्न अनिवार्य हैं। उत्तर स्पष्ट एवं सुंदर लिखावट में लिखें।</li>
            <li>गणित के प्रश्नों में सभी रफ कार्य उत्तर-पुस्तिका के अंतिम पृष्ठ पर करें।</li>
            <li>ओएमआर उत्तर पत्रक (OMR Sheet) पर बहुविकल्पीय उत्तर दर्ज करें।</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
