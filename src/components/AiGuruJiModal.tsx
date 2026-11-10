oimport React, { useState, useEffect } from 'react';
import { X, Brain, Send, Sparkles, MessageSquare, Loader2, Lightbulb, CheckCircle2 } from 'lucide-react';

interface AiGuruJiModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialChapter?: string;
}

export const AiGuruJiModal: React.FC<AiGuruJiModalProps> = ({
  isOpen,
  onClose,
  initialSubject,
  initialChapter,
}) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'guru'; content: string; timestamp: string }[]
  >([
    {
      role: 'guru',
      content:
        'नमस्ते प्रिय विद्यार्थी! मैं आपका 24/7 "AI गुरुजी" हूँ। कक्षा 10वीं बोर्ड परीक्षा के किसी भी विषय (गणित, विज्ञान, सामाजिक विज्ञान, हिंदी, अंग्रेजी) से जुड़ा कोई भी प्रश्न या शंका बेझिझक पूछें।',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialSubject && initialChapter) {
      setPrompt(`कृपया विषय "${initialSubject}" के अध्याय "${initialChapter}" से बोर्ड परीक्षा के लिए सबसे महत्वपूर्ण अवधारणाएँ और प्रश्न समझाएं।`);
    }
  }, [initialSubject, initialChapter]);

  if (!isOpen) return null;

  const quickPrompts = [
    'द्विघात समीकरण का श्रीधराचार्य सूत्र और विविक्तकर समझाएं',
    'प्रकाश के अपवर्तन के नियम एवं स्नेल का नियम क्या है?',
    'असहयोग आंदोलन और चौरी-चौरा कांड का विस्तृत विवरण दें',
    'ओम का नियम (V=IR) तथा इसके प्रयोग का सत्यापन बताइए',
    '2026 बोर्ड परीक्षा में गणित में 95%+ लाने का टाइमटेबल'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim() || loading) return;

    const userMsg = {
      role: 'user' as const,
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          subject: initialSubject,
          chapter: initialChapter,
        }),
      });

      const data = await res.json();
      if (res.ok && data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'guru',
            content: data.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'guru',
            content: 'क्षमा करें, उत्तर प्राप्त नहीं हो सका। कृपया अपना प्रश्न दोबारा पूछें।',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'guru',
          content: 'नेटवर्क समस्या या सर्वर त्रुटि। कृपया अपने इंटरनेट कनेक्शन की जाँच करें।',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl h-[90vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <span>AI गुरुजी (24/7 Class 10 Tutor)</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20">
                  Gemini 3.8 Flash
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                कक्षा 10वीं बोर्ड परीक्षा शंका समाधान एवं स्टेप-बाय-स्टेप हल
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-slate-400 font-semibold shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            त्वरित प्रश्न:
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              disabled={loading}
              className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] whitespace-nowrap transition-colors border border-slate-700 shrink-0 disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-devanagari">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-100 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.role === 'guru' && (
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs mb-2 border-b border-slate-800/80 pb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI गुरुजी मार्गदर्शन:</span>
                  </div>
                )}
                {msg.content}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-cyan-400 w-fit">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AI गुरुजी उत्तर सोच रहे हैं...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="अपना प्रश्न यहाँ लिखें... (उदा. 'ओम का नियम समझाएं')"
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
            />
            <button
              type="submit"
              disabled={!prompt.trim() || loading}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-md text-xs sm:text-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>भेजें</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
