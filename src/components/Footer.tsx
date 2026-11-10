oimport React from 'react';
import { Sparkles, ShieldCheck, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 px-4 lg:px-8 mt-16 font-devanagari">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>HighSchool Taiyar</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            कक्षा 10वीं बोर्ड परीक्षा (UP Board, CBSE, MP Board, Bihar Board) के परीक्षार्थियों के लिए डिजिटल स्टडी पोर्टल एवं AI गुरुजी।
          </p>
        </div>

        {/* Col 2: Subjects */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">विषय (Subjects)</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>गणित (Mathematics)</li>
            <li>विज्ञान (Science)</li>
            <li>सामाजिक विज्ञान (Social Science)</li>
            <li>हिंदी एवं संस्कृत</li>
            <li>अंग्रेजी (English)</li>
          </ul>
        </div>

        {/* Col 3: Features */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">विशेषताएँ</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>24/7 AI गुरुजी डाउट सॉल्वर</li>
            <li>अध्यायवार 5-Star V.I.P प्रश्न</li>
            <li>सूत्र मास्टर व फ़्लैशकार्ड</li>
            <li>2026 नवीनतम मॉडल पेपर</li>
          </ul>
        </div>

        {/* Col 4: Help & Support */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">सहायता व सपोर्ट</h4>
          <div className="flex items-center gap-2 text-slate-300">
            <Headphones className="w-4 h-4 text-amber-400" />
            <span>ऑनलाइन छात्र हेल्पडेस्क सक्रिय</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            ऐप एंड गेम स्टूडियो - बोर्ड परीक्षा स्पेशल संस्करण 2026
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <div>© 2026 HighSchool Taiyar · सर्वाधिकार सुरक्षित</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            NCERT पाठ्यक्रमानुसार
          </span>
        </div>
      </div>
    </footer>
  );
};
