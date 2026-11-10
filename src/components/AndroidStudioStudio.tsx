oimport React, { useState } from 'react';
import { Download, Smartphone, Github, CheckCircle2, Play, Sparkles, Terminal, ArrowRight, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

export const AndroidStudioStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tutorial' | 'generator' | 'diagnostics'>('tutorial');
  
  // Custom App Generator State
  const [appName, setAppName] = useState('High School Taiyar');
  const [appUrl, setAppUrl] = useState('https://ais-dev-wie53cmtrdugzh3wvsxkzw-988283472666.asia-southeast1.run.app');
  const [packageId, setPackageId] = useState('com.aistudio.highschool');
  const [isBuildingZip, setIsBuildingZip] = useState(false);

  // Copy code helper
  const [copiedCode, setCopiedCode] = useState(false);

  const workflowYml = `name: Build Phone APK
on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Grant execute permission for gradlew
        run: chmod +x gradlew || true
      - name: Build Debug APK
        run: ./gradlew assembleDebug
      - uses: actions/upload-artifact@v4
        with:
          name: App-Game-Studio-debug-apk
          path: app/build/outputs/apk/debug/app-debug.apk`;

  const handleCopyYml = () => {
    navigator.clipboard.writeText(workflowYml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGenerateCustomZip = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBuildingZip(true);
    try {
      const res = await fetch('/api/generate-app-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appName, targetUrl: appUrl, packageId }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${appName.replace(/[^a-zA-Z0-9]/g, '_')}_Android_Project.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert('प्रोजेक्ट ZIP तैयार करने में विफल।');
      }
    } catch (err) {
      alert('सर्वर एरर।');
    } finally {
      setIsBuildingZip(false);
    }
  };

  const issues = [
    {
      category: 'GRADLE',
      title: 'Permission Denied: ./gradlew Executable Failure',
      solution: 'GitHub Actions workflow में build चरण से पहले `chmod +x gradlew` कमांड जोड़ें।',
    },
    {
      category: 'JAVA',
      title: 'Unsupported class file major version 65 (JDK mismatch)',
      solution: 'Android Gradle Plugin (AGP 8.x) के लिए GitHub Actions में `java-version: "17"` सेट करें।',
    },
    {
      category: 'KEYSTORE',
      title: 'Keystore / Release Signing Error',
      solution: 'डेवलपमेंट के लिए Debug APK चुनें (`./gradlew assembleDebug`) जो बिना किसी कीस्टोर के पास हो जाता है।',
    },
    {
      category: 'CLOUDRUN',
      title: 'Cloud Run 403 Forbidden Access',
      solution: 'GCP IAM में `allUsers` भूमिका को `Cloud Run Invoker` अनुमति देकर पब्लिक एक्सेस दें।',
    },
  ];

  return (
    <section className="py-10 px-4 lg:px-8 max-w-5xl mx-auto space-y-8 font-devanagari">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Google AI Studio App to Android APK Converter 🚀</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Studio App को APK में बदलें और एंड्रॉइड में चलाएं
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Google AI Studio में बनाए गए अपने Web App को रियल Android App (`app-debug.apk`) में बदलें और मोबाइल में इंस्टॉल करें।
            </p>
          </div>

          <a
            href="/api/download-zip"
            download
            className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 shrink-0 text-xs sm:text-sm whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Ready APK Project ZIP डाउनलोड करें</span>
          </a>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tutorial'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            वीडियो गाइड व 4-स्टेप्स (Step-by-Step Tutorial)
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'generator'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            Custom App Generator (कस्टम APK बनाएँ)
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'diagnostics'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            बिल्ड एरर सॉल्वर (Diagnostics)
          </button>
        </div>
      </div>

      {activeTab === 'tutorial' && (
        <div className="space-y-6">
          {/* Key Video Highlights Box */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>आप इस गाइड में क्या-क्या सीखेंगे:</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Google AI Studio वेब ऐप को Android APK में Convert करना</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>APK को अपने Android Phone में डाउनलोड व इंस्टॉल करना</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GitHub Actions से फ्री में ऑटोमैटिक APK बिल्ड करना</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real App की तरह फुल-स्क्रीन एंड्रॉइड अनुभव प्राप्त करना</span>
              </div>
            </div>
          </div>

          {/* Detailed Step-by-step Workflow */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Github className="w-5 h-5 text-amber-400" />
              <span>Step-by-Step APK कन्वर्ज़न प्रक्रिया (APK Build Process):</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                    स्टेप 1: प्रोजेक्ट ZIP डाउनलोड करें
                  </h4>
                  <p className="text-xs text-slate-300">
                    ऊपर दिए गए "Ready APK Project ZIP डाउनलोड करें" बटन पर क्लिक करके एंड्रॉइड प्रोजेक्ट ZIP प्राप्त करें।
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                    स्टेप 2: GitHub पर Repository बनाएं
                  </h4>
                  <p className="text-xs text-slate-300">
                    अपने GitHub एकाउंट में <code className="text-amber-400">New Repository</code> बनाएं और ZIP की सभी फ़ाइलों को एक्सट्रेक्ट करके अपलोड कर दें।
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                    स्टेप 3: GitHub Actions 'Run Workflow' चलाएँ
                  </h4>
                  <p className="text-xs text-slate-300">
                    GitHub में <code className="text-amber-400">Actions</code> टैब में जाएँ, <code className="text-emerald-400">Build Phone APK</code> वर्कफ़्लो चुनें और <code className="text-cyan-400">Run workflow</code> दबाएँ।
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                    स्टेप 4: Artifacts से APK डाउनलोड व इंस्टॉल करें
                  </h4>
                  <p className="text-xs text-slate-300">
                    2 मिनट में बिल्ड सफल होने पर <code className="text-emerald-400">Artifacts</code> से <code className="text-amber-400">app-debug.apk</code> डाउनलोड करें और अपने फोन में इंस्टॉल करके चलाएं!
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub Actions Script Code Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-400 font-mono">.github/workflows/build-apk.yml</span>
                <button
                  onClick={handleCopyYml}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Script'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto leading-relaxed border border-slate-800">
                {workflowYml}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'generator' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>कस्टम AI Studio ऐप जेनेरेटर (App Generator)</span>
            </h3>
            <p className="text-xs text-slate-400">
              अपनी AI Studio लिंक या किसी भी वेबसाइट URL से नया कस्टम Android Project ZIP बनाएं।
            </p>
          </div>

          <form onSubmit={handleGenerateCustomZip} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">ऐप का नाम (App Title):</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">AI Studio ऐप URL (Website / Applet URL):</label>
              <input
                type="url"
                value={appUrl}
                onChange={(e) => setAppUrl(e.target.value)}
                required
                placeholder="https://ais-dev-wie53cmtrdugzh3wvsxkzw-988283472666.asia-southeast1.run.app"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Android Package ID:</label>
              <input
                type="text"
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                required
                placeholder="com.mycompany.myapp"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isBuildingZip}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isBuildingZip ? 'ZIP बन रही है...' : 'कस्टम Android Project ZIP डाउनलोड करें'}</span>
            </button>
          </form>
        </div>
      )}

      {activeTab === 'diagnostics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <span>Gradle, Java 17 व Cloud Run समस्या निवारण</span>
          </h3>

          <div className="space-y-3">
            {issues.map((issue, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
              >
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/20">
                  {issue.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-rose-300">{issue.title}</h4>
                <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400">समाधान: </strong>
                  {issue.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
