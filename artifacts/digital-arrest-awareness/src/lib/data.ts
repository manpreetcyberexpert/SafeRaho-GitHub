export const data = {
  stats: {
    casesReported: "92,000+",
    yearReported: "2023",
    amountLost: "Rs 1,750 Crore",
    yearLost: "2024"
  },
  redFlags: [
    { id: "rf1", text: "Caller claims to be CBI, ED, Police, or Customs official." },
    { id: "rf2", text: "They say a parcel in your name contains drugs or illegal items." },
    { id: "rf3", text: "You are asked to stay on a Skype or WhatsApp video call continuously." },
    { id: "rf4", text: "They pressure you not to tell your family or friends about the situation." },
    { id: "rf5", text: "They demand money for 'verification' or to avoid arrest." },
    { id: "rf6", text: "They show you fake FIR copies, ID cards, or arrest warrants." },
    { id: "rf7", text: "They ask you to isolate yourself in a room." },
    { id: "rf8", text: "They ask for your bank account details, Aadhaar, or OTPs." },
    { id: "rf9", text: "The call comes from an international number starting with +92, +44, etc." },
    { id: "rf10", text: "They use high-pressure tactics and create a sense of extreme urgency." }
  ],
  emergencySteps: [
    { id: 1, title: "Disconnect Immediately", description: "Phone kaat do. Real police will never arrest you over a phone or video call." },
    { id: 2, title: "Do NOT Pay or Share Details", description: "Kabhi bhi OTP, bank details, ya paise transfer mat karo." },
    { id: 3, title: "Tell Someone", description: "Apne family members ya doston ko batao. Scammers akele mein darate hain." },
    { id: 4, title: "Call Cybercrime Helpline", description: "Turant 1930 par call karo and report the incident." },
    { id: 5, title: "Block and Report the Number", description: "Jis number se call aayi hai, use block karo aur report karo." },
    { id: 6, title: "File an Online Complaint", description: "cybercrime.gov.in par jaakar official complaint darj karo." },
    { id: 7, title: "Call 100/112 if in Immediate Danger", description: "Agar aapko physically darr lag raha hai, local police ko call karo." }
  ],
  scammerScripts: [
    "Aapka Aadhaar card use karke ek illegal parcel bheja gaya hai.",
    "Hum Delhi Police Cyber Cell se bol rahe hain, aapke khilaf FIR darj hai.",
    "Aapko video call par hi rehna padega, kisi ko batana nahi warna arrest ho jayenge.",
    "Verification ke liye security deposit bhejna hoga, baad mein refund ho jayega."
  ],
  quizQuestions: [
    {
      id: "q1",
      question: "Agar koi police officer phone par kahe ki 'Aapko Digital Arrest kiya jata hai', toh aapko kya karna chahiye?",
      options: [
        "Unki saari baat manni chahiye",
        "Phone turant kaat dena chahiye kyunki 'Digital Arrest' real nahi hota",
        "Puchna chahiye ki kitne paise dene padenge",
        "Dar ke mare room mein band ho jana chahiye"
      ],
      correctAnswer: 1,
      explanation: "India ke kanoon mein 'Digital Arrest' naam ki koi cheez nahi hai. Real police kabhi video call par arrest nahi karti."
    },
    {
      id: "q2",
      question: "Ek caller bolta hai ki uske paas aapka arrest warrant hai aur WhatsApp par bhejta hai. Yeh kya hai?",
      options: [
        "Yeh real warrant hai",
        "Yeh fake warrant hai, scammers photo edit karte hain",
        "Mujhe unke bataye account mein fine dena chahiye",
        "Mujhe turant ghar se bhag jana chahiye"
      ],
      correctAnswer: 1,
      explanation: "Police WhatsApp par arrest warrant nahi bhejti. Yeh fake documents hote hain jo fear create karne ke liye banaye jate hain."
    },
    {
      id: "q3",
      question: "Agar caller kahe ki 'Jab tak investigation chal rahi hai, phone mat kaatna aur kisi ko mat batana', toh kya karein?",
      options: [
        "Phone kaat dein aur family ko batayein",
        "Unki baat mankar phone par hi rahein",
        "Unhe aur personal details de dein",
        "Doston se chupkar baat sunein"
      ],
      correctAnswer: 0,
      explanation: "Scammers isolation chahte hain taaki aap kisi se madad na le sakein. Turant phone kaatein aur family ko batayein."
    },
    {
      id: "q4",
      question: "Cyber Crime ki National Helpline Number kya hai?",
      options: [
        "100",
        "108",
        "1930",
        "1098"
      ],
      correctAnswer: 2,
      explanation: "1930 is the dedicated National Cyber Crime Helpline in India."
    },
    {
      id: "q5",
      question: "Caller CBI se hone ka daava karta hai aur kehta hai ki aapke account ki 'verification' ke liye paise transfer karo jo baad mein wapas mil jayenge. Aap kya karenge?",
      options: [
        "Turant paise transfer kar dunga",
        "Unse identification mangunga",
        "Kabhi bhi 'verification' ke liye paise nahi dunga",
        "Bank se loan lekar paise dunga"
      ],
      correctAnswer: 2,
      explanation: "Koi bhi government agency, CBI, ya police aapse bank account mein 'verification' ke liye paise nahi mangti."
    },
    {
      id: "q6",
      question: "Online cyber crime complaint kahan darj ki ja sakti hai?",
      options: [
        "Facebook par",
        "WhatsApp helpline par",
        "cybercrime.gov.in par",
        "Kahin nahi"
      ],
      correctAnswer: 2,
      explanation: "The official government portal to report cybercrimes is www.cybercrime.gov.in."
    },
    {
      id: "q7",
      question: "Agar foreign number (+92, +44) se WhatsApp video call aaye aur saamne wala police uniform mein ho, toh?",
      options: [
        "Call uthakar baat sununga",
        "Wo real police ho sakti hai kyunki unhone uniform pehni hai",
        "Call nahi uthaunga aur number block kar dunga",
        "Darr jaunga aur jo wo kahenge manunga"
      ],
      correctAnswer: 2,
      explanation: "Indian police foreign numbers se ya WhatsApp video call karke interrogate nahi karti. Uniform bhi fake hoti hai."
    }
  ]
};
