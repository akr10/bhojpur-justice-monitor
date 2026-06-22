export type LocaleLang = "en" | "hi";

export type LocaleStrings = {
  nav: {
    siteTitle: string;
    siteTagline: string;
    factsTimeline: string;
    floodImpact: string;
    aiAssistant: string;
    langToggle: string;
    primaryAria: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: [string, string, string];
    ctaTimeline: string;
    ctaFlood: string;
  };
  sections: {
    factsTitle: string;
    factsDescription: string;
    floodTitle: string;
    floodDescription: string;
    aiTitle: string;
    aiDescription: string;
    verifiedSourcesTitle: string;
    verifiedSourcesBody: string;
    linkTimeline: string;
    linkFloodTable: string;
  };
  timeline: {
    title: string;
    description: string;
    empty: string;
    sourceLabel: string;
    fairDealingNote: string;
    readOriginalReport: string;
    categories: {
      encounter: string;
      judicial: string;
      administrative: string;
      news: string;
    };
    events: Record<
      string,
      { title: string; description: string; source: string }
    >;
  };
  flood: {
    formTitle: string;
    formDescription: string;
    villageLabel: string;
    villagePlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    evidenceLabel: string;
    evidencePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    errorNetwork: string;
    tableTitle: string;
    tableDescription: string;
    searchPlaceholder: string;
    colFamilyId: string;
    colVillage: string;
    colGrievance: string;
    colStatus: string;
    colEvidence: string;
    communityBadge: string;
    evidenceView: string;
    evidenceNone: string;
    noResults: string;
    showing: string;
    of: string;
    records: string;
    filteredFrom: string;
    previous: string;
    next: string;
    page: string;
    sourceFooter: string;
    statuses: Record<string, string>;
    grievanceTypes: Record<string, string>;
  };
  chat: {
    name: string;
    tagline: string;
    welcome: string;
    generating: string;
    assistantLabel: string;
    youLabel: string;
    inputPlaceholder: string;
    inputAria: string;
    micStart: string;
    micStop: string;
    micUnsupported: string;
    send: string;
    stop: string;
    listening: string;
    footerIdle: string;
    langBhojpuri: string;
    langHindi: string;
    langEnglish: string;
  };
  footer: {
    legalDisclaimer: string;
    privacyPolicy: string;
    grievanceOfficer: string;
    legalNavAria: string;
  };
  legal: {
    backHome: string;
  };
  privacy: {
    title: string;
    intro: string;
    dataMinimizationTitle: string;
    dataMinimization: string;
    anonymousGrievancesTitle: string;
    anonymousGrievances: string;
    dpdpTitle: string;
    dpdpBody: string;
    intermediaryTitle: string;
    intermediaryBody: string;
  };
  contact: {
    title: string;
    intro: string;
    grievanceOfficerTitle: string;
    grievanceOfficerBody: string;
    emailLabel: string;
    scopeTitle: string;
    scopeBody: string;
    responseTitle: string;
    responseBody: string;
    transparencyTitle: string;
    transparencyBody: string;
  };
};

export const locales: Record<LocaleLang, LocaleStrings> = {
  en: {
    nav: {
      siteTitle: "Bhojpur Justice Monitor",
      siteTagline: "Civic transparency portal",
      factsTimeline: "Facts & Timeline",
      floodImpact: "Flood Impact Data",
      aiAssistant: "AI Civic Assistant",
      langToggle: "हिंदी",
      primaryAria: "Primary",
    },
    hero: {
      eyebrow: "Bhojpur Region · Civic Tech Utility",
      title: "Objective, data-driven transparency for Bhojpur",
      description:
        "Bhojpur Justice Monitor is an independent civic transparency portal that surfaces verified facts, timelines, and flood impact data—helping residents, journalists, and advocates hold institutions accountable with evidence, not speculation.",
      highlights: [
        "Verified public records",
        "Geospatial flood data",
        "AI-assisted civic guidance",
      ],
      ctaTimeline: "Explore Facts & Timeline",
      ctaFlood: "View Flood Impact Data",
    },
    sections: {
      factsTitle: "Facts & Timeline",
      factsDescription:
        "Verified public milestones plus live press syndication for Bhojpur encounter coverage—cached for fast loads, refreshed every 10 minutes.",
      floodTitle: "Flood Impact Data",
      floodDescription:
        "Searchable grievance register with anonymous community submissions stored in serverless KV.",
      aiTitle: "AI Civic Assistant",
      aiDescription:
        "Ask about verified local facts, flood impact records, or request a neutral RTI template. The assistant auto-detects Bhojpuri, Hindi, and English—and stays grounded in objective civic data.",
      verifiedSourcesTitle: "Verified data sources",
      verifiedSourcesBody:
        "The assistant is configured to answer only from civicData.ts, including the case timeline and flood relief register shown above.",
      linkTimeline: "Case Timeline Tracker →",
      linkFloodTable: "Flood Aid Accountability Table →",
    },
    timeline: {
      title: "Case Timeline Tracker",
      description:
        "Verified milestones plus live syndicated updates from trusted press sources (refreshed every 10 minutes).",
      empty: "No timeline entries available.",
      sourceLabel: "Source",
      fairDealingNote:
        "Syndicated news entries display a neutral one-sentence summary, explicit publisher attribution, and a direct link to the original report (Copyright Act §52 fair dealing).",
      readOriginalReport: "Read original report at publisher",
      categories: {
        encounter: "Incident",
        judicial: "Judicial",
        administrative: "Administrative",
        news: "Live Feed",
      },
      events: {
        "evt-2026-06-17-encounter": {
          title: "Bhojpur encounter",
          description:
            "A reported police encounter occurs in Bhojpur district. Local residents and civil society groups call for an independent account of events and preservation of evidence.",
          source:
            "District incident bulletin · verified press summary (2026-06-17)",
        },
        "evt-2026-06-20-probe": {
          title: "High-level judicial probe ordered",
          description:
            "Chief Minister Samrat Choudhary orders a high-level judicial probe into the Bhojpur encounter, directing that proceedings remain transparent and time-bound.",
          source: "State government order · CM office release (2026-06-20)",
        },
        "evt-2026-06-21-suspensions": {
          title: "Police personnel suspensions",
          description:
            "Several police personnel connected to the Bhojpur encounter are placed under suspension pending the outcome of the judicial probe and departmental review.",
          source:
            "Home department notification · district HQ circular (2026-06-21)",
        },
      },
    },
    flood: {
      formTitle: "Submit Anonymous Community Grievance",
      formDescription:
        "No IP addresses, cookies, or browser metadata are stored—only the fields below.",
      villageLabel: "Village Area",
      villagePlaceholder: "e.g. Bilauti, Jawania",
      detailsLabel: "Grievance Details",
      detailsPlaceholder:
        "Describe the relief issue or administrative delay…",
      evidenceLabel: "Evidence Link (optional)",
      evidencePlaceholder: "https://…",
      submit: "Submit Grievance",
      submitting: "Submitting…",
      success:
        "Grievance submitted anonymously. It will appear in the register after the next refresh cycle.",
      errorNetwork: "Network error. Please try again.",
      tableTitle: "Flood Aid Accountability Table",
      tableDescription:
        "{total}+ district records plus {community} live community submission(s) · refreshed every 10 minutes",
      searchPlaceholder: "Search village, grievance, status…",
      colFamilyId: "Family ID",
      colVillage: "Village Area",
      colGrievance: "Grievance Type",
      colStatus: "Administrative Relief Status",
      colEvidence: "Evidence",
      communityBadge: "Community",
      evidenceView: "View",
      evidenceNone: "—",
      noResults: "No records match your search.",
      showing: "Showing",
      of: "of",
      records: "records",
      filteredFrom: "filtered from",
      previous: "Previous",
      next: "Next",
      page: "Page",
      sourceFooter:
        "Source: District disaster management consolidated grievance register (public summary) · community rows stored in Vercel KV (anonymous)",
      statuses: {
        "Pending verification": "Pending verification",
        "Under review": "Under review",
        "Partially disbursed": "Partially disbursed",
        Disbursed: "Disbursed",
        "Escalated to district HQ": "Escalated to district HQ",
      },
      grievanceTypes: {
        "Crop damage compensation": "Crop damage compensation",
        "Ration kit delay": "Ration kit delay",
        "Shelter material pending": "Shelter material pending",
        "Cash relief pending": "Cash relief pending",
        "Medical reimbursement": "Medical reimbursement",
        "Livestock loss claim": "Livestock loss claim",
      },
    },
    chat: {
      name: "Bhojpur Civic Assistant",
      tagline: "Objective local facts · RTI templates · Bhojpuri / Hindi / English",
      welcome:
        "Namaste. I am the Bhojpur Civic Assistant. Ask about verified local civic facts, flood impact data on this portal, or request a neutral RTI application template. I respond in Bhojpuri, Hindi, or English—whichever you use.",
      generating: "Generating response from verified civic data…",
      assistantLabel: "Assistant",
      youLabel: "You",
      inputPlaceholder: "Type or speak in Bhojpuri, Hindi, or English…",
      inputAria: "Message the civic assistant",
      micStart: "Start voice input",
      micStop: "Stop voice input",
      micUnsupported: "Speech recognition not supported in this browser",
      send: "Send message",
      stop: "Stop generating",
      listening: "Listening… speak in Bhojpuri, Hindi, or English.",
      footerIdle:
        "Responses are grounded in civicData.ts—objective facts and RTI templates only.",
      langBhojpuri: "Bhojpuri",
      langHindi: "Hindi",
      langEnglish: "English",
    },
    footer: {
      legalDisclaimer:
        "Legal Disclaimer: This application is an independent, non-profit civic tech dashboard built exclusively for public data transparency and community legal awareness. All timelines, milestones, and statistical data displayed here are compiled strictly from verified mainstream media networks and official government department bulletins. This portal does not generate independent claims, host unverified personal allegations, or provide biased commentary. The automated RTI generator is a general drafting utility tool and does not constitute formal legal counsel.",
      privacyPolicy: "Privacy Policy",
      grievanceOfficer: "Grievance Officer",
      legalNavAria: "Legal and compliance links",
    },
    legal: {
      backHome: "Back to home",
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "Bhojpur Justice Monitor is a non-profit civic transparency utility. This policy explains how we handle data in plain language, in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 and applicable Indian IT rules.",
      dataMinimizationTitle: "Data Minimization",
      dataMinimization:
        "Data Minimization: This platform operates on a strict zero-collection policy. We do not track, log, or store user IP addresses, browser cookies, device fingerprints, or personal identifiers.",
      anonymousGrievancesTitle: "Anonymous Grievances",
      anonymousGrievances:
        "Anonymous Grievances: Any data submitted through the public grievance form is stored securely and anonymously solely to display community flood aid metrics.",
      dpdpTitle: "DPDP Act 2023 Alignment",
      dpdpBody:
        "We process only the minimum anonymous grievance fields you voluntarily submit. We do not build user profiles, sell data, or share information with third-party advertisers. You may request correction of community-submitted records by contacting our Grievance Officer.",
      intermediaryTitle: "Intermediary Status",
      intermediaryBody:
        "This portal acts as a good-faith intermediary that aggregates verified public information. For takedown requests, data corrections, or legal notices, please use our Grievance Officer contact page.",
    },
    contact: {
      title: "Grievance Officer & Legal Contact",
      intro:
        "Under the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, this portal maintains a dedicated grievance redressal channel for users, news agencies, and government departments.",
      grievanceOfficerTitle: "Designated Grievance Officer",
      grievanceOfficerBody:
        "Send official takedown notices, copyright concerns, factual correction requests, or intermediary compliance queries to the email below. Include the specific URL, timeline entry, or dataset reference in your message.",
      emailLabel: "Public grievance email",
      scopeTitle: "Who may contact us",
      scopeBody:
        "Residents, journalists, news publishers, civil society groups, and government departments may use this channel to report data errors, request corrections, or submit lawful removal notices regarding syndicated content.",
      responseTitle: "Response timeline",
      responseBody:
        "All valid complaints are acknowledged within 7 days and addressed transparently. Where a correction or takedown is warranted, we will update or remove the referenced material and document the action taken.",
      transparencyTitle: "Transparency commitment",
      transparencyBody:
        "We do not collect personal identifiers with grievance correspondence. Please avoid sending sensitive personal data unless strictly necessary for your complaint.",
    },
  },
  hi: {
    nav: {
      siteTitle: "भोजपुर जस्टिस मॉनिटर",
      siteTagline: "नागरिक पारदर्शिता पोर्टल",
      factsTimeline: "तथ्य और समयरेखा",
      floodImpact: "बाढ़ प्रभाव डेटा",
      aiAssistant: "AI नागरिक सहायक",
      langToggle: "English",
      primaryAria: "मुख्य नेविगेशन",
    },
    hero: {
      eyebrow: "भोजपुर क्षेत्र · सिविक टेक उपयोगिता",
      title: "भोजपुर के लिए वस्तुनिष्ठ, डेटा-आधारित पारदर्शिता",
      description:
        "भोजपुर जस्टिस मॉनिटर एक स्वतंत्र नागरिक पारदर्शिता पोर्टल है जो सत्यापित तथ्य, समयरेखा और बाढ़ प्रभाव डेटा प्रस्तुत करता है—निवासियों, पत्रकारों और अधिवक्ताओं को साक्ष्य के आधार पर जवाबदेही सुनिश्चित करने में मदद करता है।",
      highlights: [
        "सत्यापित सार्वजनिक अभिलेख",
        "भू-स्थानिक बाढ़ डेटा",
        "AI सहायता से नागरिक मार्गदर्शन",
      ],
      ctaTimeline: "तथ्य और समयरेखा देखें",
      ctaFlood: "बाढ़ प्रभाव डेटा देखें",
    },
    sections: {
      factsTitle: "तथ्य और समयरेखा",
      factsDescription:
        "सत्यापित सार्वजनिक मील के पत्थर और भोजपुर मुठभेड़ पर लाइव प्रेस सिंडिकेशन—तेज़ लोडिंग के लिए कैश, हर 10 मिनट में अपडेट।",
      floodTitle: "बाढ़ प्रभाव डेटा",
      floodDescription:
        "अनाम समुदाय शिकायतों के साथ खोज योग्य शिकायत रजिस्टर, सर्वरलेस KV में संग्रहीत।",
      aiTitle: "AI नागरिक सहायक",
      aiDescription:
        "सत्यापित स्थानीय तथ्य, बाढ़ राहत रिकॉर्ड, या तटस्थ RTI टेम्पलेट के बारे में पूछें। सहायक भोजपुरी, हिंदी और अंग्रेजी स्वतः पहचानता है।",
      verifiedSourcesTitle: "सत्यापित डेटा स्रोत",
      verifiedSourcesBody:
        "सहायक केवल civicData.ts से उत्तर देने के लिए कॉन्फ़िगर है, जिसमें ऊपर दिखाई गई समयरेखा और बाढ़ राहत रजिस्टर शामिल हैं।",
      linkTimeline: "केस टाइमलाइन ट्रैकर →",
      linkFloodTable: "बाढ़ सहायता जवाबदेही तालिका →",
    },
    timeline: {
      title: "केस टाइमलाइन ट्रैकर",
      description:
        "सत्यापित मील के पत्थर और विश्वसनीय प्रेस स्रोतों से लाइव अपडेट (हर 10 मिनट में रिफ्रेश)।",
      empty: "कोई समयरेखा प्रविष्टि उपलब्ध नहीं।",
      sourceLabel: "स्रोत",
      fairDealingNote:
        "सिंडिकेटेड समाचार प्रविष्टियाँ एक तटस्थ एक-वाक्य सारांश, स्पष्ट प्रकाशक attribution, और मूल रिपोर्ट का सीधा लिंक दिखाती हैं (कॉपीराइट अधिनियम §52 उचित व्यवहार)।",
      readOriginalReport: "प्रकाशक की मूल रिपोर्ट पढ़ें",
      categories: {
        encounter: "घटना",
        judicial: "न्यायिक",
        administrative: "प्रशासनिक",
        news: "लाइव फ़ीड",
      },
      events: {
        "evt-2026-06-17-encounter": {
          title: "भोजपुर मुठभेड़",
          description:
            "भोजपुर जिले में पुलिस मुठभेड़ की सूचना। स्थानीय निवासी और नागरिक समाज स्वतंत्र जांच और साक्ष्य संरक्षण की मांग कर रहे हैं।",
          source:
            "जिला घटना बुलेटिन · सत्यापित प्रेस सारांश (2026-06-17)",
        },
        "evt-2026-06-20-probe": {
          title: "उच्च स्तरीय न्यायिक जांच का आदेश",
          description:
            "मुख्यमंत्री सम्राट चौधरी ने भोजपुर मुठभेड़ की उच्च स्तरीय न्यायिक जांच का आदेश दिया, कार्यवाही पारदर्शी और समयबद्ध रखने का निर्देश।",
          source: "राज्य सरकार आदेश · CM कार्यालय विज्ञप्ति (2026-06-20)",
        },
        "evt-2026-06-21-suspensions": {
          title: "पुलिसकर्मियों पर निलंबन",
          description:
            "भोजपुर मुठभेड़ से जुड़े कई पुलिसकर्मियों को न्यायिक जांच और विभागीय समीक्षा के परिणाम तक निलंबित किया गया।",
          source:
            "गृह विभाग अधिसूचना · जिला मुख्यालय परिपत्र (2026-06-21)",
        },
      },
    },
    flood: {
      formTitle: "अनाम समुदाय शिकायत दर्ज करें",
      formDescription:
        "कोई IP पता, कुकी या ब्राउज़र मेटाडेटा संग्रहीत नहीं होता—केवल नीचे के फ़ील्ड।",
      villageLabel: "गाँव / क्षेत्र",
      villagePlaceholder: "जैसे बिलौती, जवानिया",
      detailsLabel: "शिकायत विवरण",
      detailsPlaceholder: "राहत या प्रशासनिक विलंब का विवरण लिखें…",
      evidenceLabel: "साक्ष्य लिंक (वैकल्पिक)",
      evidencePlaceholder: "https://…",
      submit: "शिकायत जमा करें",
      submitting: "जमा हो रहा है…",
      success:
        "शिकायत अनाम रूप से जमा हो गई। अगले रिफ्रेश चक्र के बाद रजिस्टर में दिखेगी।",
      errorNetwork: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।",
      tableTitle: "बाढ़ सहायता जवाबदेही तालिका",
      tableDescription:
        "{total}+ जिला रिकॉर्ड और {community} लाइव समुदाय शिकायत · हर 10 मिनट में रिफ्रेश",
      searchPlaceholder: "गाँव, शिकायत, स्थिति खोजें…",
      colFamilyId: "परिवार ID",
      colVillage: "गाँव / क्षेत्र",
      colGrievance: "शिकायत प्रकार",
      colStatus: "प्रशासनिक राहत स्थिति",
      colEvidence: "साक्ष्य",
      communityBadge: "समुदाय",
      evidenceView: "देखें",
      evidenceNone: "—",
      noResults: "आपकी खोज से कोई रिकॉर्ड मेल नहीं खाता।",
      showing: "दिखा रहे हैं",
      of: "में से",
      records: "रिकॉर्ड",
      filteredFrom: "कुल",
      previous: "पिछला",
      next: "अगला",
      page: "पृष्ठ",
      sourceFooter:
        "स्रोत: जिला आपदा प्रबंधन समेकित शिकायत रजिस्टर · समुदाय पंक्तियाँ Vercel KV में (अनाम)",
      statuses: {
        "Pending verification": "सत्यापन लंबित",
        "Under review": "समीक्षाधीन",
        "Partially disbursed": "आंशिक वितरण",
        Disbursed: "वितरित",
        "Escalated to district HQ": "जिला मुख्यालय को escalated",
      },
      grievanceTypes: {
        "Crop damage compensation": "फसल क्षति मुआवज़ा",
        "Ration kit delay": "राशन किट में देरी",
        "Shelter material pending": "आश्रय सामग्री लंबित",
        "Cash relief pending": "नकद राहत लंबित",
        "Medical reimbursement": "चिकित्सा प्रतिपूर्ति",
        "Livestock loss claim": "पशुधन हानि दावा",
      },
    },
    chat: {
      name: "भोजपुर नागरिक सहायक",
      tagline: "वस्तुनिष्ठ स्थानीय तथ्य · RTI टेम्पलेट · भोजपुरी / हिंदी / English",
      welcome:
        "नमस्ते। मैं भोजपुर नागरिक सहायक हूँ। सत्यापित स्थानीय तथ्य, बाढ़ डेटा, या RTI टेम्पलेट के बारे में पूछें। मैं भोजपुरी, हिंदी या अंग्रेजी में उत्तर देता हूँ।",
      generating: "सत्यापित नागरिक डेटा से उत्तर तैयार हो रहा है…",
      assistantLabel: "सहायक",
      youLabel: "आप",
      inputPlaceholder: "भोजपुरी, हिंदी या अंग्रेजी में लिखें या बोलें…",
      inputAria: "नागरिक सहायक को संदेश भेजें",
      micStart: "वॉइस इनपुट शुरू करें",
      micStop: "वॉइस इनपुट बंद करें",
      micUnsupported: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं",
      send: "संदेश भेजें",
      stop: "जनरेशन रोकें",
      listening: "सुन रहे हैं… भोजपुरी, हिंदी या अंग्रेजी में बोलें।",
      footerIdle:
        "उत्तर केवल civicData.ts पर आधारित—वस्तुनिष्ठ तथ्य और RTI टेम्पलेट।",
      langBhojpuri: "भोजपुरी",
      langHindi: "हिंदी",
      langEnglish: "English",
    },
    footer: {
      legalDisclaimer:
        "कानूनी अस्वीकरण: यह एप्लिकेशन एक स्वतंत्र, गैर-लाभकारी सिविक टेक डैशबोर्ड है जिसे विशेष रूप से सार्वजनिक डेटा पारदर्शिता और सामुदायिक कानूनी जागरूकता के लिए बनाया गया है। यहां प्रदर्शित सभी समयसीमाएं, मील के पत्थर और सांख्यिकीय डेटा पूरी तरह से सत्यापित मुख्यधारा के समाचार मीडिया नेटवर्क और आधिकारिक सरकारी विभाग के बुलेटिनों से संकलित किए गए हैं। यह पोर्टल स्वतंत्र दावे उत्पन्न नहीं करता है, असत्यापित व्यक्तिगत आरोपों को होस्ट नहीं करता है, या पक्षपातपूर्ण टिप्पणी प्रदान नहीं करता है। स्वचालित आरटीआई जनरेटर एक सामान्य ड्राफ्टिंग उपयोगिता उपकरण है और यह औपचारिक कानूनी सलाह नहीं है।",
      privacyPolicy: "गोपनीयता नीति",
      grievanceOfficer: "शिकायत अधिकारी",
      legalNavAria: "कानूनी और अनुपालन लिंक",
    },
    legal: {
      backHome: "होम पर वापस",
    },
    privacy: {
      title: "गोपनीयता नीति",
      intro:
        "भोजपुर जस्टिस मॉनिटर एक गैर-लाभकारी नागरिक पारदर्शिता उपयोगिता है। यह नीति सरल भाषा में बताती है कि हम डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम, 2023 और भारतीय IT नियमों के अनुसार डेटा कैसे संभालते हैं।",
      dataMinimizationTitle: "डेटा न्यूनीकरण",
      dataMinimization:
        "डेटा न्यूनीकरण: यह प्लेटफ़ॉर्म सख्त शून्य-संग्रह नीति पर संचालित होता है। हम उपयोगकर्ता IP पते, ब्राउज़र कुकी, डिवाइस फ़िंगरप्रिंट, या व्यक्तिगत पहचानकर्ता को ट्रैक, लॉग, या संग्रहीत नहीं करते हैं।",
      anonymousGrievancesTitle: "अनाम शिकायतें",
      anonymousGrievances:
        "अनाम शिकायतें: सार्वजनिक शिकायत फ़ॉर्म के माध्यम से जमा किया गया कोई भी डेटा केवल समुदाय बाढ़ सहायता मेट्रिक्स प्रदर्शित करने के लिए सुरक्षित और अनाम रूप से संग्रहीत किया जाता है।",
      dpdpTitle: "DPDP अधिनियम 2023 संरेखण",
      dpdpBody:
        "हम केवल वही न्यूनतम अनाम शिकायत फ़ील्ड संसाधित करते हैं जो आप स्वेच्छा से जमा करते हैं। हम उपयोगकर्ता प्रोफ़ाइल नहीं बनाते, डेटा नहीं बेचते, और तृतीय-पक्ष विज्ञापनदाताओं के साथ जानकारी साझा नहीं करते। समुदाय-जमा रिकॉर्ड सुधार के लिए हमारे शिकायत अधिकारी से संपर्क करें।",
      intermediaryTitle: "मध्यस्थ स्थिति",
      intermediaryBody:
        "यह पोर्टल सत्यापित सार्वजनिक जानकारी को एकत्र करने वाला सद्भावनापूर्ण मध्यस्थ है। हटाने के अनुरोध, डेटा सुधार, या कानूनी नोटिस के लिए कृपया हमारे शिकायत अधिकारी संपर्क पृष्ठ का उपयोग करें।",
    },
    contact: {
      title: "शिकायत अधिकारी और कानूनी संपर्क",
      intro:
        "सूचना प्रौद्योगिकी (मध्यस्थ दिशानिर्देश और डिजिटल मीडिया आचार संहिता) नियमों के तहत, यह पोर्टल उपयोगकर्ताओं, समाचार एजेंसियों और सरकारी विभागों के लिए एक समर्पित शिकायत निवारण चैनल बनाए रखता है।",
      grievanceOfficerTitle: "नियुक्त शिकायत अधिकारी",
      grievanceOfficerBody:
        "आधिकारिक हटाने के नोटिस, कॉपीराइट संबंधी चिंताएं, तथ्यात्मक सुधार अनुरोध, या मध्यस्थ अनुपालन प्रश्न नीचे दिए ईमेल पर भेजें। अपने संदेश में विशिष्ट URL, समयरेखा प्रविष्टि, या डेटासेट संदर्भ शामिल करें।",
      emailLabel: "सार्वजनिक शिकायत ईमेल",
      scopeTitle: "कौन संपर्क कर सकता है",
      scopeBody:
        "निवासी, पत्रकार, समाचार प्रकाशक, नागरिक समाज समूह, और सरकारी विभाग डेटा त्रुटियों की रिपोर्ट करने, सुधार का अनुरोध करने, या सिंडिकेटेड सामग्री पर कानूनी हटाने के नोटिस जमा करने के लिए इस चैनल का उपयोग कर सकते हैं।",
      responseTitle: "प्रतिक्रिया समयरेखा",
      responseBody:
        "सभी वैध शिकायतों की 7 दिनों के भीतर स्वीकृति दी जाती है और पारदर्शी रूप से संबोधित की जाती है। जहाँ सुधार या हटाने की आवश्यकता हो, हम संदर्भित सामग्री को अपडेट या हटा देंगे और की गई कार्रवाई का दस्तावेजीकरण करेंगे।",
      transparencyTitle: "पारदर्शिता प्रतिबद्धता",
      transparencyBody:
        "हम शिकायत पत्राचार के साथ व्यक्तिगत पहचानकर्ता एकत्र नहीं करते। कृपया संवेदनशील व्यक्तिगत डेटा तभी भेजें जब आपकी शिकायत के लिए यह अत्यंत आवश्यक हो।",
    },
  },
};

export function getLocale(lang: LocaleLang): LocaleStrings {
  return locales[lang];
}
