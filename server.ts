import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI(
  apiKey: process.env.GEMINI_API_KEY || '', isko Jodi Ja photo
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Route: AI GuruJi High School Tutor
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, subject, chapter } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt required' });
    }

    const systemInstruction = `आप कक्षा 10वीं (Class 10 High School Board Exams - UP Board, CBSE, MP Board, Bihar Board) के सर्वश्रेष्ठ "AI गुरुजी" (AI High School Guru) हैं।
आपका काम छात्रों को गणित (Maths), विज्ञान (Science), सामाजिक विज्ञान (Social Science), हिंदी (Hindi) और अंग्रेजी (English) के कठिन विषयों को बहुत सरल, हिंदी भाषा (देवनगरी लिपि) में समझाना है।

नियम:
1. उत्तर को साफ-सुथरे हेडिंग्स, बुलेट पॉइंट्स (•), और स्टेप-बाय-बाय प्रक्रिया में लिखें।
2. गणित के प्रश्नों में सूत्र (Formula) और स्टेप्स जरूर दें।
3. विज्ञान में रासायनिक समीकरण (Chemical Reactions) या चित्र विवरण (Diagram explanation) शामिल करें।
4. बोर्ड परीक्षा 95%+ अंक पाने के विशेष टिप्स (Exam Booster Tips) और ट्रिक्स (Memory Tricks) दें।
5. भाषा दोस्ताना, उत्साहवर्धक और सरल हिंदी-इंग्लिश मिश्रित होनी चाहिए।`;

    let userPrompt = prompt;
    if (subject && chapter) {
      userPrompt = `विषय: ${subject}, अध्याय: ${chapter}\nप्रश्न / शंका: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
      },
    });

    return res.json({ answer: response.text ?? 'क्षमा करें, उत्तर जनरेट नहीं हो सका। कृपया पुनः प्रयास करें।' });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return res.status(500).json({
      error: 'AI GuruJi is currently unavailable.',
      details: err?.message || String(err),
    });
  }
});

// API Route: AI Quiz Generator
app.post('/api/gemini/quiz', async (req, res) => {
  try {
    const { subject, chapter, count = 5 } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `कक्षा 10वीं ${subject || 'सामान्य विज्ञान'} के अध्याय "${chapter || 'महत्वपूर्ण प्रश्न'}" से ${count} बहुविकल्पीय प्रश्न (MCQs) जनरेट करें जो बोर्ड परीक्षा के लिए अति महत्वपूर्ण हों।`,
      config: {
        systemInstruction: 'You are an exam setter for Class 10 High School Board Exams. Output JSON matching the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            subject: { type: Type.STRING },
            chapter: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                },
                required: ['id', 'question', 'options', 'correctIndex', 'explanation'],
              },
            },
          },
          required: ['quizTitle', 'subject', 'chapter', 'questions'],
        },
      },
    });

    const jsonStr = (response.text ?? '{}').trim();
    const data = JSON.parse(jsonStr);
    return res.json(data);
  } catch (err: any) {
    console.error('Gemini Quiz Error:', err);
    return res.status(500).json({ error: 'Failed to generate custom quiz.' });
  }
});

// API Route: Custom App Generator ZIP Creation
app.post('/api/generate-app-zip', async (req, res) => {
  try {
    const { appName = 'My HighSchool App', targetUrl = 'https://example.com', packageId = 'com.highschool.app' } = req.body;

    const zip = new JSZip();

    // Android Project Files
    zip.file('gradle.properties', 'android.useAndroidX=true\nandroid.enableJetifier=true\n');
    zip.file('settings.gradle', `rootProject.name = "${appName.replace(/[^a-zA-Z0-9_]/g, '')}"\ninclude ':app'\n`);
    zip.file('build.gradle', `buildscript {\n    repositories {\n        google()\n        mavenCentral()\n    }\n    dependencies {\n        classpath "com.android.tools.build:gradle:8.6.1"\n    }\n}\nallprojects {\n    repositories {\n        google()\n        mavenCentral()\n    }\n}\n`);
    
    // GitHub Workflow
    zip.file('.github/workflows/build-apk.yml', `name: Build Phone APK\non:\n  workflow_dispatch:\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-java@v4\n        with:\n          java-version: '17'\n          distribution: 'temurin'\n      - name: Grant execute permission for gradlew\n        run: chmod +x gradlew || true\n      - name: Build Debug APK\n        run: ./gradlew assembleDebug\n      - uses: actions/upload-artifact@v4\n        with:\n          name: ${appName.replace(/[^a-zA-Z0-9_]/g, '')}-debug-apk\n          path: app/build/outputs/apk/debug/app-debug.apk\n`);

    // App Module Files
    const pkgPath = packageId.replace(/\./g, '/');
    zip.file('app/build.gradle', `plugins {\n    id 'com.android.application'\n}\nandroid {\n    namespace '${packageId}'\n    compileSdk 34\n    defaultConfig {\n        applicationId "${packageId}"\n        minSdk 24\n        targetSdk 34\n        versionCode 1\n        versionName "1.0"\n    }\n    compileOptions {\n        sourceCompatibility JavaVersion.VERSION_17\n        targetCompatibility JavaVersion.VERSION_17\n    }\n}\n`);
    
    zip.file('app/src/main/AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android">\n    <uses-permission android:name="android.permission.INTERNET" />\n    <application\n        android:allowBackup="true"\n        android:label="${appName}"\n        android:supportsRtl="true"\n        android:theme="@android:style/Theme.NoTitleBar">\n        <activity\n            android:name=".MainActivity"\n            android:exported="true">\n            <intent-filter>\n                <action android:name="android.intent.action.MAIN" />\n                <category android:name="android.intent.category.LAUNCHER" />\n            </intent-filter>\n        </activity>\n    </application>\n</manifest>`);

    zip.file(`app/src/main/java/${pkgPath}/MainActivity.java`, `package ${packageId};\nimport android.os.Bundle;\nimport android.webkit.WebView;\nimport android.webkit.WebViewClient;\nimport androidx.appcompat.app.AppCompatActivity;\n\npublic class MainActivity extends AppCompatActivity {\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        WebView webView = new WebView(this);\n        setContentView(webView);\n        webView.getSettings().setJavaScriptEnabled(true);\n        webView.setWebViewClient(new WebViewClient());\n        webView.loadUrl("${targetUrl}");\n    }\n}\n`);

    zip.file('README.md', `# ${appName}\nGenerated Android WebView Project for High School App Studio.\n\n## How to Build APK:\n1. Upload all files to a GitHub Repository.\n2. Go to Actions -> Run Workflow ("Build Phone APK").\n3. Download your APK from Artifacts.\n`);

    const content = await zip.generateAsync({ type: 'nodebuffer' });
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${appName.replace(/[^a-zA-Z0-9]/g, '_')}_Android_Project.zip"`);
    return res.send(content);
  } catch (err: any) {
    console.error('App Zip Generation Error:', err);
    return res.status(500).json({ error: 'Failed to generate app zip' });
  }
});

// API Route: Custom Educational Game Maker ZIP Creation
app.post('/api/generate-game-zip', async (req, res) => {
  try {
    const { gameName = 'Math Speed Quiz Game', instructions = 'टैप करके सही उत्तर चुनें' } = req.body;

    const zip = new JSZip();

    const gameHtml = `<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${gameName}</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding: 20px; }
    .card { background: #1e293b; padding: 30px; border-radius: 16px; max-w: 400px; margin: 40px auto; border: 1px solid #334155; }
    h1 { color: #fbbf24; font-size: 24px; }
    p { color: #94a3b8; font-size: 14px; }
    .btn { background: #f59e0b; color: #0f172a; font-weight: bold; padding: 12px 24px; border: none; border-radius: 10px; font-size: 16px; cursor: pointer; margin-top: 15px; }
    .score { font-size: 32px; font-weight: bold; color: #34d399; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>✦ ${gameName}</h1>
    <p>${instructions}</p>
    <div className="score" id="score">स्कोर: 0</div>
    <div id="qBox" style="font-size:20px; font-weight:bold; margin:15px 0;">5 + 7 = ?</div>
    <button class="btn" onclick="check(12)">12</button>
    <button class="btn" onclick="check(10)">10</button>
    <button class="btn" onclick="check(15)">15</button>
  </div>
  <script>
    let score = 0;
    function check(ans) {
      if(ans === 12) score += 10;
      document.getElementById('score').innerText = 'स्कोर: ' + score;
      alert('शाबाश! सही उत्तर।');
    }
  </script>
</body>
</html>`;

    zip.file('index.html', gameHtml);
    zip.file('README.md', `# ${gameName}\nHTML5 Educational Game Starter.\nOpen index.html in any browser or embed into an Android WebView.\n`);

    const content = await zip.generateAsync({ type: 'nodebuffer' });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${gameName.replace(/[^a-zA-Z0-9]/g, '_')}_Game.zip"`);
    return res.send(content);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate game zip' });
  }
});

// API Route: Download App Studio Original Master Project ZIP
app.get('/api/download-zip', (req, res) => {
  const zipPath = path.join(__dirname, 'public', 'assets', 'aistudio', 'App-Game-Studio-Hindi-Final-Project_60a016e5.zip');
  
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="HighSchool_App_Android_Project.zip"');
    fs.createReadStream(zipPath).pipe(res);
  } else {
    res.status(404).json({ error: 'Android Project ZIP file not found.' });
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 High School Taiyar Server running on port ${PORT}`);
  });
}

startServer();
