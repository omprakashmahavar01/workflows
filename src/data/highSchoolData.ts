ooexport interface Chapter {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  summary: string;
  keyPoints: string[];
  formulas?: { name: string; formula: string; explanation: string }[];
  importantQuestions: { q: string; a: string; marks: number; isVip?: boolean }[];
  mcqs: { question: string; options: string[]; correct: number; explanation: string }[];
}

export interface Subject {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  bgGradient: string;
  totalChapters: number;
  chapters: Chapter[];
}

export const HIGH_SCHOOL_SUBJECTS: Subject[] = [
  {
    id: 'maths',
    name: 'गणित (Mathematics)',
    nameEn: 'Mathematics',
    icon: 'Calculator',
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    totalChapters: 14,
    chapters: [
      {
        id: 'real-numbers',
        number: 1,
        title: 'वास्तविक संख्याएँ (Real Numbers)',
        titleEn: 'Real Numbers',
        summary: 'अंकगणित की आधारभूत प्रमेय (Fundamental Theorem of Arithmetic), अभाज्य गुणनखंडन, LCM एवं HCF का संबंध तथा अपरिमेय संख्याओं सिद्ध करने की तकनीक।',
        keyPoints: [
          'प्रत्येक भाज्य संख्या को अभाज्य संख्याओं के एक गुणनफल के रूप में व्यक्त किया जा सकता है।',
          'दो धनात्मक पूर्णांकों a तथा b के लिए: HCF(a, b) × LCM(a, b) = a × b',
          'यदि p एक अभाज्य संख्या है और p, a² को विभाजित करता है, तो p, a को भी विभाजित करेगा।',
          '√2, √3, √5 अपरिमेय संख्याएँ हैं।'
        ],
        formulas: [
          { name: 'LCM × HCF संबंध', formula: 'HCF(a, b) × LCM(a, b) = a × b', explanation: 'दो संख्याओं के गुणनफल और उनके HCF/LCM के बीच संबंध' },
          { name: 'अभाज्य गुणनखंडन नियम', formula: 'N = p₁ᵃ · p₂ᵇ · p₃ᶜ', explanation: 'किसी भी संख्या को अभाज्य गुणनफल में तोड़ना' }
        ],
        importantQuestions: [
          { q: 'सिद्ध कीजिए कि √5 एक अपरिमेय संख्या है।', a: 'मान लीजिए √5 एक परिमेय संख्या है। अतः √5 = a/b (जहाँ a और b सह-अभाज्य हैं तथा b ≠ 0)। दोनों तरफ वर्ग करने पर 5b² = a²... इससे सिद्ध होता है कि 5, a को विभाजित करता है। इसी प्रकार 5, b को भी विभाजित करेगा जो कि विरोधाभास है। अतः √5 एक अपरिमेय संख्या है।', marks: 5, isVip: true },
          { q: 'संख्याओं 96 और 404 का HCF अभाज्य गुणनखंडन विधि द्वारा ज्ञात कीजिए और फिर इनका LCM ज्ञात कीजिए।', a: '96 = 2⁵ × 3, 404 = 2² × 101। HCF = 2² = 4। LCM = (96 × 404) / 4 = 9696।', marks: 3 }
        ],
        mcqs: [
          {
            question: 'यदि दो संख्याओं का HCF = 9 और उनका गुणनफल 306 × 657 है, तो LCM क्या होगा?',
            options: ['22338', ['22388'], '22330', '22438'].flat(),
            correct: 0,
            explanation: 'LCM = (a × b) / HCF = (306 × 657) / 9 = 22338।'
          },
          {
            question: 'निम्नलिखित में से कौन सी अपरिमेय संख्या है?',
            options: ['√4', '3/5', 'π', '0.333...'],
            correct: 2,
            explanation: 'π एक अपरिमेय संख्या है क्योंकि इसका दशमलव प्रसार अशांत और अनावर्ती होता है।'
          }
        ]
      },
      {
        id: 'polynomials',
        number: 2,
        title: 'बहुपद (Polynomials)',
        titleEn: 'Polynomials',
        summary: 'बहुपद के शून्यक (Zeros), द्विघात बहुपद के शून्यकों और गुणांकों के बीच संबंध (α+β = -b/a, αβ = c/a)।',
        keyPoints: [
          'रैखिक बहुपद ax + b का शून्यक -b/a होता है।',
          'द्विघात बहुपद ax² + bx + c के शून्यक α और β हों तो: शून्यकों का योग (α + β) = -b/a',
          'शून्यकों का गुणनफल (α · β) = c/a',
          'द्विघात बहुपद प्राप्त करने का सूत्र: k[x² - (α + β)x + αβ]'
        ],
        formulas: [
          { name: 'शून्यकों का योग', formula: 'α + β = -b / a', explanation: 'x के गुणांक तथा x² के गुणांक का अनुपात' },
          { name: 'शून्यकों का गुणनफल', formula: 'α · β = c / a', explanation: 'अचर पद तथा x² के गुणांक का अनुपात' },
          { name: 'बहुपद निर्माण सूत्र', formula: 'P(x) = x² - (Sum)x + (Product)', explanation: 'शून्यक दिए होने पर बहुपद बनाना' }
        ],
        importantQuestions: [
          { q: 'द्विघात बहुपद x² + 7x + 10 के शून्यक ज्ञात कीजिए और शून्यकों तथा गुणांकों के बीच संबंध की सत्यता की जाँच कीजिए।', a: 'x² + 7x + 10 = (x + 2)(x + 5)। शून्यक α = -2, β = -5। योग = -2 + (-5) = -7 = -b/a (-7/1)। गुणनफल = (-2)(-5) = 10 = c/a (10/1)। सत्यता प्रमाणित।', marks: 3, isVip: true }
        ],
        mcqs: [
          {
            question: 'द्विघात बहुपद 2x² - 8x + 6 के शून्यकों का योग क्या होगा?',
            options: ['2', '4', '-4', '6'],
            correct: 1,
            explanation: 'शून्यकों का योग = -b/a = -(-8)/2 = 8/2 = 4।'
          }
        ]
      },
      {
        id: 'quadratic-equations',
        number: 3,
        title: 'द्विघात समीकरण (Quadratic Equations)',
        titleEn: 'Quadratic Equations',
        summary: 'मानक रूप ax² + bx + c = 0, विविक्तकर (Discriminant D = b² - 4ac), द्विघाती सूत्र x = (-b ± √D)/2a तथा मूलों की प्रकृति।',
        keyPoints: [
          'यदि D > 0: दो भिन्न वास्तविक मूल (Two distinct real roots)',
          'यदि D = 0: दो बराबर वास्तविक मूल (Two equal real roots, x = -b/2a)',
          'यदि D < 0: कोई वास्तविक मूल नहीं (No real roots)'
        ],
        formulas: [
          { name: 'विविक्तकर (Discriminant)', formula: 'D = b² - 4ac', explanation: 'मूलों की प्रकृति निर्धारित करने वाला व्यंजक' },
          { name: 'द्विघाती सूत्र (श्रीधराचार्य सूत्र)', formula: 'x = (-b ± √(b² - 4ac)) / (2a)', explanation: 'द्विघात समीकरण के मूल निकालने का सर्वव्यापी सूत्र' }
        ],
        importantQuestions: [
          { q: 'समीकरण 2x² - 4x + 3 = 0 का विविक्तकर ज्ञात कीजिए और फिर मूलों की प्रकृति बताइए।', a: 'a = 2, b = -4, c = 3। D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8। चूंकि D < 0 है, इसलिए दिए गए समीकरण के कोई वास्तविक मूल नहीं हैं।', marks: 3, isVip: true }
        ],
        mcqs: [
          {
            question: 'यदि समीकरण kx² + 4x + 1 = 0 के मूल बराबर हैं, तो k का मान क्या होगा?',
            options: ['2', '4', '8', '16'],
            correct: 1,
            explanation: 'बराबर मूलों के लिए D = 0 => b² - 4ac = 0 => 4² - 4(k)(1) = 0 => 16 = 4k => k = 4।'
          }
        ]
      },
      {
        id: 'trigonometry',
        number: 4,
        title: 'त्रिकोणमिति का परिचय (Trigonometry)',
        titleEn: 'Introduction to Trigonometry',
        summary: 'समकोण त्रिभुज में त्रिकोणमितीय अनुपात (sin, cos, tan, cosec, sec, cot), सर्वसमिकाएँ और विशिष्ट कोणों के मान।',
        keyPoints: [
          'sin θ = लम्ब / कर्ण (P/H), cos θ = आधार / कर्ण (B/H), tan θ = लम्ब / आधार (P/B)',
          'sin² θ + cos² θ = 1',
          '1 + tan² θ = sec² θ',
          '1 + cot² θ = cosec² θ',
          'sin 30° = 1/2, cos 30° = √3/2, tan 45° = 1, sin 90° = 1'
        ],
        formulas: [
          { name: 'प्रथम सर्वसमिका', formula: 'sin² θ + cos² θ = 1', explanation: 'मूल त्रिकोणमितीय संबंध' },
          { name: 'द्वितीय सर्वसमिका', formula: '1 + tan² θ = sec² θ', explanation: 'टैन और सेक में संबंध' },
          { name: 'तृतीय सर्वसमिका', formula: '1 + cot² θ = cosec² θ', explanation: 'कोट और कोसेक में संबंध' }
        ],
        importantQuestions: [
          { q: 'सिद्ध कीजिए: (1 + tan² A) / (1 + cot² A) = tan² A', a: 'LHS = sec² A / cosec² A = (1/cos² A) / (1/sin² A) = sin² A / cos² A = tan² A = RHS। इति सिद्धम।', marks: 4, isVip: true }
        ],
        mcqs: [
          {
            question: 'sin 60° · cos 30° + sin 30° · cos 60° का मान क्या होगा?',
            options: ['0', '1/2', '1', '2'],
            correct: 2,
            explanation: '(√3/2)(√3/2) + (1/2)(1/2) = 3/4 + 1/4 = 4/4 = 1।'
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'विज्ञान (Science)',
    nameEn: 'Science',
    icon: 'FlaskConical',
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    totalChapters: 13,
    chapters: [
      {
        id: 'chemical-reactions',
        number: 1,
        title: 'रासायनिक अभिक्रियाएं एवं समीकरण (Chemical Reactions)',
        titleEn: 'Chemical Reactions and Equations',
        summary: 'रासायनिक समीकरणों को संतुलित करना, संयोजन, वियोजन, विस्थापन, द्विविस्थापन अभिक्रियाएँ, उपचयन-अपचयन (Redox), संक्षारण और विकृतगंधिता।',
        keyPoints: [
          'द्रव्यमान संरक्षण का नियम: किसी भी रासायनिक अभिक्रिया में द्रव्यमान का न तो निर्माण होता है और न ही विनाश।',
          'संयोजन अभिक्रिया: जब दो या दो से अधिक पदार्थ मिलकर एकल उत्पाद बनाते हैं (e.g., CaO + H₂O → Ca(OH)₂ + ऊष्मा)।',
          'वियोजन अभिक्रिया: जब एकल अभिकर्मक टूटकर दो या अधिक उत्पाद देता है (e.g., 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃)।',
          'ऑक्सीकरण (उपचयन) = ऑक्सीजन की वृद्धि या हाइड्रोजन की कमी।',
          'अपचयन = ऑक्सीजन की कमी या हाइड्रोजन की वृद्धि।'
        ],
        formulas: [
          { name: 'बिना बुझा चूना + जल', formula: 'CaO + H₂O → Ca(OH)₂ + Heat', explanation: 'ऊष्माक्षेपी संयोजन अभिक्रिया का उदाहरण' },
          { name: 'रेडॉक्स अभिक्रिया', formula: 'CuO + H₂ → Cu + H₂O', explanation: 'CuO का अपचयन Cu में तथा H₂ का उपचयन H₂O में' }
        ],
        importantQuestions: [
          { q: 'ऊष्माक्षेपी (Exothermic) एवं ऊष्माशोषी (Endothermic) अभिक्रिया का क्या अर्थ है? उदाहरण दीजिए।', a: '1. ऊष्माक्षेपी अभिक्रिया: जिन अभिक्रियाओं में उत्पाद के निर्माण के साथ-साथ ऊष्मा भी उत्पन्न होती है। उदाहरण: श्वसन (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ऊर्जा)।\n2. ऊष्माशोषी अभिक्रिया: जिन अभिक्रियाओं में ऊर्जा अवशोषित होती है। उदाहरण: प्रकाश संश्लेषण (Photosynthesis)।', marks: 4, isVip: true }
        ],
        mcqs: [
          {
            question: 'लोहे पर जंग लगना किस प्रकार की अभिक्रिया है?',
            options: ['संयोजन अभिक्रिया', ['संक्षारण व उपचयन (Redox)'], 'अपचयन', 'वियोजन अभिक्रिया'].flat(),
            correct: 1,
            explanation: 'लोहे का जंग लगना (Rusting of iron) वायु और नमी की उपस्थिति में संक्षारण एवं रेडॉक्स प्रक्रिया है।'
          }
        ]
      },
      {
        id: 'acids-bases-salts',
        number: 2,
        title: 'अम्ल, क्षारक एवं लवण (Acids, Bases & Salts)',
        titleEn: 'Acids, Bases and Salts',
        summary: 'pH स्केल, सूचक (Litmus, Methyl Orange), प्लास्टर ऑफ पेरिस, धावन सोडा, बेकिंग सोडा, विरंजक चूर्ण के रासायनिक नाम व उपयोग।',
        keyPoints: [
          'अम्ल नीले लिटमस को लाल करते हैं (pH < 7)।',
          'क्षारक लाल लिटमस को नीला करते हैं (pH > 7)।',
          'उदासीनीकरण अभिक्रिया: अम्ल + क्षारक → लवण + जल (e.g., HCl + NaOH → NaCl + H₂O)।',
          'प्लास्टर ऑफ पेरिस: CaSO₄ · ½H₂O (जिप्सम को 373K पर गर्म करने से प्राप्त)।',
          'बेकिंग सोडा: NaHCO₃ (सोडियम हाइड्रोजन कार्बोनेट)।'
        ],
        formulas: [
          { name: 'प्लास्टर ऑफ पेरिस', formula: 'CaSO₄ · ½H₂O', explanation: 'टूटी हड्डियों को जोड़ने में प्रयुक्त' },
          { name: 'बेकिंग सोडा (NaHCO₃)', formula: 'NaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃', explanation: 'खाने का सोडा बनाने का समीकरण' }
        ],
        importantQuestions: [
          { q: 'प्लास्टर ऑफ पेरिस को आर्द्र-रोधी (Moisture-proof) बर्तन में क्यों रखा जाना चाहिए? व्याख्या कीजिए।', a: 'प्लास्टर ऑफ पेरिस (CaSO₄ · ½H₂O) जल या नमी के संपर्क में आकर जल का अवशोषण करता है और कड़ा ठोस पदार्थ "जिप्सम" (CaSO₄ · 2H₂O) बना लेता है। इससे इसका जमने का गुण नष्ट हो जाता है। अतः इसे नमी-रोधी बर्तन में रखना चाहिए।', marks: 3, isVip: true }
        ],
        mcqs: [
          {
            question: 'शुद्ध जल का pH मान कितना होता है?',
            options: ['0', '7', '14', '6'],
            correct: 1,
            explanation: 'शुद्ध जल उदासीन होता है, इसलिए इसका pH मान 7 होता है।'
          }
        ]
      },
      {
        id: 'light-reflection-refraction',
        number: 3,
        title: 'प्रकाश - परावर्तन तथा अपवर्तन (Light Reflection & Refraction)',
        titleEn: 'Light - Reflection and Refraction',
        summary: 'दर्पण सूत्र (1/f = 1/v + 1/u), लेंस सूत्र (1/f = 1/v - 1/u), आवर्धन, स्नेल का नियम और अपवर्तनांक।',
        keyPoints: [
          'दर्पण सूत्र: 1/f = 1/v + 1/u (f = फोकस दूरी, v = प्रतिबिंब दूरी, u = बिंब दूरी)',
          'लेंस सूत्र: 1/f = 1/v - 1/u',
          'लेंस की क्षमता P = 1 / f (मीटर में), इसका मात्रक डाइऑप्टर (D) है।',
          'स्नेल का नियम: sin i / sin r = Constant (अपवर्तनांक μ)'
        ],
        formulas: [
          { name: 'दर्पण सूत्र', formula: '1/f = 1/v + 1/u', explanation: 'गोलीय दर्पण के लिए फोकस संबंध' },
          { name: 'लेंस सूत्र', formula: '1/f = 1/v - 1/u', explanation: 'पतले लेंस के लिए संबंध' },
          { name: 'लेंस क्षमता (Diopter)', formula: 'P = 1 / f (in meters)', explanation: '1m फोकस दूरी के लेंस की क्षमता 1D होती है' }
        ],
        importantQuestions: [
          { q: 'किसी अवतल दर्पण की फोकस दूरी 15 सेमी है। दर्पण से कितनी दूरी पर वस्तु को रखा जाए कि उसका प्रतिबिंब दर्पण से 10 सेमी दूरी पर बने?', a: 'f = -15 cm, v = -10 cm (अवतल दर्पण)। दर्पण सूत्र 1/f = 1/v + 1/u से: 1/u = 1/f - 1/v = -1/15 - (-1/10) = -1/15 + 1/10 = 1/30। अतः u = -30 cm। वस्तु को दर्पण से 30 सेमी की दूरी पर रखना होगा।', marks: 5, isVip: true }
        ],
        mcqs: [
          {
            question: '2 मीटर फोकस दूरी वाले उत्तल लेंस की क्षमता क्या होगी?',
            options: ['+0.5 D', '-0.5 D', '+2 D', '-2 D'],
            correct: 0,
            explanation: 'P = +1/f = +1/2 = +0.5 D (उत्तल लेंस की फोकस दूरी धनात्मक होती है)।'
          }
        ]
      },
      {
        id: 'electricity',
        number: 4,
        title: 'विद्युत (Electricity)',
        titleEn: 'Electricity',
        summary: 'ओम का नियम (V = IR), प्रतिरोधकता, श्रेणीक्रम व समांतर क्रम संयोजन, विद्युत शक्ति (P = VI = I²R = V²/R) और जूल का तापन नियम।',
        keyPoints: [
          'विद्युत धारा I = Q / t (मात्रक: एम्पीयर A)।',
          'ओम का नियम: नियत ताप पर चालक के सिरों का विभवांतर उसमें प्रवाहित धारा के समानुपाती होता है (V = IR)।',
          'प्रतिरोध R = ρ · (L / A)',
          'श्रेणीक्रम संयोजन: R_eq = R₁ + R₂ + R₃',
          'समांतर क्रम संयोजन: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃',
          'जूल का तापन नियम: H = I² R t'
        ],
        formulas: [
          { name: 'ओम का नियम', formula: 'V = I · R', explanation: 'विभवांतर, धारा और प्रतिरोध का संबंध' },
          { name: 'जूल तापन सूत्र', formula: 'H = I² · R · t', explanation: 'उत्पन्न ऊष्मा की मात्रा' },
          { name: 'विद्युत शक्ति', formula: 'P = V · I = I²R = V²/R', explanation: 'ऊर्जा की दर (वाट)' }
        ],
        importantQuestions: [
          { q: 'ओम का नियम क्या है? इसके सत्यापन का परिपथ आरेख बनाइए।', a: 'यदि किसी चालक की भौतिक अवस्थाएँ (जैसे ताप) स्थिर रहें, तो चालक के सिरों पर लगाया गया विभवांतर (V) उसमें प्रवाहित धारा (I) के अनुक्रमानुपाती होता है। अर्थात् V ∝ I => V = IR (जहाँ R चालक का प्रतिरोध है)।', marks: 5, isVip: true }
        ],
        mcqs: [
          {
            question: 'प्रतिरोधकता (Resistivity) का S.I. मात्रक क्या है?',
            options: ['ओम (Ω)', 'ओम-मीटर (Ω·m)', 'एम्पीयर (A)', 'वॉट (W)'],
            correct: 1,
            explanation: 'प्रतिरोधकता ρ = (R · A)/L => (Ω · m²)/m = Ω·m (ओम-मीटर)।'
          }
        ]
      }
    ]
  },
  {
    id: 'social-science',
    name: 'सामाजिक विज्ञान (Social Science)',
    nameEn: 'Social Science',
    icon: 'Globe',
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    totalChapters: 12,
    chapters: [
      {
        id: 'nationalism-india',
        number: 1,
        title: 'भारत में राष्ट्रवाद (Nationalism in India)',
        titleEn: 'Nationalism in India',
        summary: 'प्रथम विश्व युद्ध का प्रभाव, असहयोग आंदोलन (Non-Cooperation Movement), जलियांवाला बाग हत्याकांड, दांडी यात्रा एवं सविनय अवज्ञा आंदोलन (Civil Disobedience Movement)।',
        keyPoints: [
          '13 अप्रैल 1919: अमृतसर में जलियांवाला बाग हत्याकांड (जनरल डायर द्वारा)।',
          '1920: महात्मा गांधी द्वारा असहयोग आंदोलन की शुरुआत।',
          'फरवरी 1922: चौरी-चौरा कांड के बाद असहयोग आंदोलन वापस लिया गया।',
          '12 मार्च 1930: साबरमती आश्रम से दांडी तक नमक यात्रा (दांडी मार्च)।',
          '6 अप्रैल 1930: नमक कानून तोड़कर सविनय अवज्ञा आंदोलन का आरंभ।'
        ],
        importantQuestions: [
          { q: 'महात्मा गांधी ने असहयोग आंदोलन क्यों वापस लिया? चौरी-चौरा घटना का वर्णन कीजिए।', a: '5 फरवरी 1922 को गोरखपुर के चौरी-चौरा में शांतिपूर्ण जुलूस पर पुलिस द्वारा गोली चलाने के विरोध में क्रुद्ध भीड़ ने थाने में आग लगा दी, जिसमें 22 पुलिसकर्मी जलकर मर गए। गांधीजी अहिंसा के पुजारी थे, उन्होंने देखा कि आंदोलन हिंसक हो रहा है, अतः 12 फरवरी 1922 को असहयोग आंदोलन वापस ले लिया।', marks: 5, isVip: true },
          { q: 'नमक यात्रा (दांडी मार्च) का उपनिवेशवाद के खिलाफ विरोध का एक शक्तिशाली प्रतीक क्यों थी?', a: 'नमक का उपयोग अमीर-गरीब सभी करते थे। नमक पर कर लगाना ब्रिटिश हुकूमत का सबसे दमनकारी पहलू था। गांधीजी ने 240 मील की यात्रा 78 स्वयंसेवकों के साथ पूरी की और नमक बनाकर अंग्रेजों के दमनकारी कानून को चुनौती दी।', marks: 4 }
        ],
        mcqs: [
          {
            question: 'जलियांवाला बाग हत्याकांड किस तिथि को हुआ था?',
            options: ['13 अप्रैल 1919', '15 अगस्त 1920', '26 जनवरी 1930', '5 फरवरी 1922'],
            correct: 0,
            explanation: '13 अप्रैल 1919 को बैसाखी के दिन अमृतसर के जलियांवाला बाग में यह दुखद घटना घटी थी।'
          }
        ]
      },
      {
        id: 'resources-development',
        number: 2,
        title: 'संसाधन एवं विकास (Resources & Development)',
        titleEn: 'Resources and Development',
        summary: 'संसाधनों का वर्गीकरण, सतत पोषणीय विकास (Sustainable Development), मृदा के प्रकार (जलोढ़, काली, लाल, लेटराइट) एवं मृदा अपरदन।',
        keyPoints: [
          'सतत पोषणीय विकास: पर्यावरण को बिना नुकसान पहुँचाए और भावी पीढ़ी की आवश्यकताओं की अवहेलना किए बिना विकास।',
          'काली मृदा (Regur Soil): कपास की खेती के लिए सबसे उपयुक्त, दक्कन के पठार में पाई जाती है।',
          'जलोढ़ मृदा (Alluvial Soil): भारत में सबसे विस्तृत और उपजाऊ मृदा (खादर व बांगर)।',
          'मृदा अपरदन रोकने के उपाय: सोपानी कृषि (Contour ploughing), पट्टिका कृषि (Strip cropping), रक्षक मेखला।'
        ],
        importantQuestions: [
          { q: 'काली मृदा की मुख्य विशेषताएँ बताइए तथा यह किन राज्यों में पाई जाती है?', a: '1. काली मृदा का रंग काला होता है और इसे "रेगुर मृदा" भी कहते हैं।\n2. यह नमी धारण करने की अपार क्षमता रखती है।\n3. यह कपास की खेती के लिए सर्वोत्तम है।\n4. मुख्य राज्य: महाराष्ट्र, गुजरात, मध्य प्रदेश और छत्तीसगढ़।', marks: 4, isVip: true }
        ],
        mcqs: [
          {
            question: 'निम्नलिखित में से किस राज्य में काली मृदा मुख्य रूप से पाई जाती है?',
            options: ['राजस्थान', 'गुजरात', 'पंजाब', 'बिहार'],
            correct: 1,
            explanation: 'गुजरात एवं महाराष्ट्र में काली मृदा का सर्वाधिक विस्तार है।'
          }
        ]
      }
    ]
  },
  {
    id: 'hindi',
    name: 'हिंदी (Hindi)',
    nameEn: 'Hindi',
    icon: 'BookOpen',
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-pink-500/10 border-rose-500/30',
    totalChapters: 10,
    chapters: [
      {
        id: 'surdas-pad',
        number: 1,
        title: 'सूरदास के पद (Surdas ke Pad)',
        titleEn: 'Surdas ke Pad',
        summary: 'गोपियों और ऊधो के बीच संवाद, कृष्ण के प्रति गोपियों का अनन्य प्रेम, योग संदेश का खंडन।',
        keyPoints: [
          'गोपियाँ ऊधो को "वडभागी" (भाग्यशाली) कहकर व्यंग्य करती हैं क्योंकि वे कृष्ण के निकट रहकर भी प्रेम से अछूते रहे।',
          'गोपियाँ कृष्ण के प्रेम को "हारिल की लकड़ी" के समान मानती हैं जिसे वे किसी भी हाल में छोड़ नहीं सकतीं।',
          'योग संदेश को गोपियाँ "कड़वी ककड़ी" के समान बकवास और अरुचिकर बताती हैं।'
        ],
        importantQuestions: [
          { q: 'गोपियों द्वारा उद्धव को भाग्यवान कहने में क्या व्यंग्य निहित है?', a: 'गोपियाँ उद्धव पर व्यंग्य करती हैं कि वे कृष्ण रूपी सौंदर्य एवं प्रेम सागर के निकट रहकर भी उनके अनुराग में नहीं बंधे। वास्तव में वे उद्धव को अभागा मानती हैं जो प्रेम के अद्भुत आनंद से वंचित रहे।', marks: 3, isVip: true }
        ],
        mcqs: [
          {
            question: 'गोपियों ने उद्धव के योग संदेश को किसके समान बताया है?',
            options: ['मीठे फल', 'कड़वी ककड़ी', 'अमृत', 'दवा'],
            correct: 1,
            explanation: 'गोपियों के अनुसार योग का संदेश कड़वी ककड़ी के समान नीरस और अरुचिकर है।'
          }
        ]
      },
      {
        id: 'hindi-grammar',
        number: 2,
        title: 'हिंदी व्याकरण - समास व अलंकार (Hindi Grammar)',
        titleEn: 'Hindi Grammar',
        summary: 'समास के भेद (अव्ययीभाव, तत्पुरुष, द्विगु, द्वंद्व, बहुव्रीहि) और अलंकार (अनुप्रास, यमक, श्लेष, उपमा, रूपक, उत्प्रेक्षा)।',
        keyPoints: [
          'द्विगु समास: पहला पद संख्यावाचक होता है (e.g., चौराहा, त्रिफला)।',
          'द्वंद्व समास: दोनों पद प्रधान होते हैं (e.g., माता-पिता, दिन-रात)।',
          'बहुव्रीहि समास: कोई अन्य पद प्रधान होता है (e.g., लंबोदर - गणेश जी)।',
          'उत्प्रेक्षा अलंकार: जहाँ उपमेय में उपमान की संभावना की जाए (मनु, मानो, जनु शब्दों का प्रयोग)।'
        ],
        importantQuestions: [
          { q: 'उपमा अलंकार और रूपक अलंकार में अंतर स्पष्ट कीजिए। उदाहरण भी दीजिए।', a: '1. उपमा अलंकार: जहाँ दो वस्तुओं की समानता दर्शाई जाए। उदाहरण: "पीपर पात सरिस मन डोला"।\n2. रूपक अलंकार: जहाँ उपमेय और उपमान में भेद मिटाकर एक मान लिया जाए। उदाहरण: "चरण कमल बंदौ हरि राई"।', marks: 4, isVip: true }
        ],
        mcqs: [
          {
            question: '"दशानन" शब्द में कौन सा समास है?',
            options: ['द्विगु समास', 'बहुव्रीहि समास', 'तत्पुरुष समास', 'द्वंद्व समास'],
            correct: 1,
            explanation: 'दशानन = दस हैं आनन (मुख) जिसके अर्थात् रावण (विशेष अर्थ), अतः बहुव्रीहि समास है।'
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'अंग्रेजी (English)',
    nameEn: 'English Language & Literature',
    icon: 'Languages',
    color: 'text-violet-400',
    bgGradient: 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
    totalChapters: 8,
    chapters: [
      {
        id: 'letter-to-god',
        number: 1,
        title: 'A Letter to God (G.L. Fuentes)',
        titleEn: 'A Letter to God',
        summary: 'Story of Lencho, a hardworking farmer with unshakable faith in God, whose corn crop was destroyed by hailstorm.',
        keyPoints: [
          'Lencho expected a good harvest, but a severe hailstorm destroyed his entire ripe corn field.',
          'He wrote a letter to God requesting 100 pesos to sow his field again.',
          'The compassionate Postmaster collected 70 pesos from employees and sent it to Lencho.',
          'Irony of the story: Lencho called the post office employees a "bunch of crooks" thinking they stole 30 pesos.'
        ],
        importantQuestions: [
          { q: 'Why did Lencho write a letter to God? What was the outcome?', a: 'Lencho’s crops were completely destroyed by a devastating hailstorm. He had deep faith in God and wrote a letter requesting 100 pesos. The postmaster read it and kindly collected 70 pesos to help him, showcasing human kindness.', marks: 4, isVip: true }
        ],
        mcqs: [
          {
            question: 'How much money did Lencho receive in response to his letter?',
            options: ['100 pesos', '70 pesos', '50 pesos', '30 pesos'],
            correct: 1,
            explanation: 'The postmaster could only collect 70 pesos instead of the 100 pesos Lencho asked for.'
          }
        ]
      }
    ]
  }
];

export const FORMULA_MASTER_SHEET = [
  { category: 'Maths - बीजगणित', name: 'द्विघाती सूत्र (श्रीधराचार्य)', formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', note: 'b² - 4ac = विविक्तकर D' },
  { category: 'Maths - समानांतर श्रेढ़ी', name: 'n-वाँ पद सूत्र', formula: 'a_n = a + (n - 1)d', note: 'a = प्रथम पद, d = सार्व अंतर' },
  { category: 'Maths - समानांतर श्रेढ़ी', name: 'n पदों का योग', formula: 'S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)', note: 'l = अंतिम पद' },
  { category: 'Maths - त्रिकोणमिति', name: 'पाइथागोरस सर्वसमिका', formula: '\\sin^2\\theta + \\cos^2\\theta = 1', note: '1 + \\tan^2\\theta = \\sec^2\\theta' },
  { category: 'Maths - निर्देशांक ज्यामिति', name: 'दूरी सूत्र', formula: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}', note: 'दो बिंदुओं के बीच दूरी' },
  { category: 'Science - भौतिकी', name: 'ओम का नियम', formula: 'V = I \\cdot R', note: 'V = विभवांतर, I = धारा, R = प्रतिरोध' },
  { category: 'Science - भौतिकी', name: 'दर्पण सूत्र', formula: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}', note: 'f = फोकस दूरी, v = प्रतिबिंब दूरी, u = वस्तु दूरी' },
  { category: 'Science - भौतिकी', name: 'लेंस क्षमता', formula: 'P = \\frac{1}{f \\text{ (मीटर में)}} \\text{ (Diopters)}', note: 'उत्तल के लिए +, अवतल के लिए -' },
  { category: 'Science - रसायन', name: 'बेकिंग सोडा सूत्र', formula: 'NaHCO_3 \\text{ (Sodium Bicarbonate)}', note: 'एंटासिड व बेकिंग पाउडर में' },
  { category: 'Science - रसायन', name: 'धावन सोडा सूत्र', formula: 'Na_2CO_3 \\cdot 10H_2O \\text{ (Washing Soda)}', note: 'जल की स्थायी कठोरता दूर करने हेतु' }
];

export const BOARD_MODEL_PAPERS = [
  {
    id: 'up-math-2026',
    board: 'UP Board / CBSE / NCERT',
    subject: 'गणित (Mathematics)',
    year: '2026 मॉडल प्रश्न-पत्र',
    totalMarks: 70,
    time: '3 घंटे 15 मिनट',
    description: 'कक्षा 10वीं गणित बोर्ड परीक्षा के नवीनतम पैटर्न पर आधारित पूर्ण हल सहित प्रश्न-पत्र।',
    sections: [
      { name: 'खंड-अ (Section A) - 20 बहुविकल्पीय प्रश्न (MCQs)', marks: 20 },
      { name: 'खंड-ब (Section B) - 5 अति लघु उत्तरीय प्रश्न (2-2 अंक)', marks: 10 },
      { name: 'खंड-स (Section C) - 6 लघु उत्तरीय प्रश्न (4-4 अंक)', marks: 24 },
      { name: 'खंड-द (Section D) - 2 दीर्घ उत्तरीय विस्तृत प्रश्न (8-8 अंक)', marks: 16 }
    ]
  },
  {
    id: 'up-sci-2026',
    board: 'UP Board / CBSE / NCERT',
    subject: 'विज्ञान (Science)',
    year: '2026 मॉडल प्रश्न-पत्र',
    totalMarks: 70,
    time: '3 घंटे 15 मिनट',
    description: 'रसायन विज्ञान, भौतिक विज्ञान एवं जीव विज्ञान के अति महत्वपूर्ण 5-स्टार प्रश्नों का संग्रह।',
    sections: [
      { name: 'रसायन विज्ञान (Chemistry Section)', marks: 20 },
      { name: 'जीव विज्ञान (Biology Section)', marks: 25 },
      { name: 'भौतिक विज्ञान (Physics Section)', marks: 25 }
    ]
  }
];
