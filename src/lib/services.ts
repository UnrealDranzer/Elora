export type ServiceCategory =
  | 'Preventive'
  | 'Restorative'
  | 'Surgical'
  | 'Prosthodontics'
  | 'Cosmetic'
  | 'Alignment'
  | 'Functional / TMJ';

export type ServiceDetail = {
  slug: string;
  title: string;
  category: ServiceCategory;
  navDescription: string;
  isPopular?: boolean;
  image: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  h1: string;
  heroDescription: string;
  content: string[];
  faqs: { q: string; a: string }[];
  dark?: boolean;
};

export const services: ServiceDetail[] = [
  // --- PREVENTIVE ---
  {
    slug: 'oral-prophylaxis',
    title: 'Oral Prophylaxis',
    category: 'Preventive',
    navDescription: 'Professional ultrasonic cleaning and polishing.',
    image: '/treatments/oral-prophylaxis.png',
    seo: {
      title: 'Oral Prophylaxis & Teeth Cleaning in Airoli | DANTVED CLINIC',
      description: 'Professional ultrasonic teeth cleaning and polishing to prevent cavities and gum disease. Book your routine oral prophylaxis at DANTVED CLINIC, Airoli.',
      keywords: 'Oral Prophylaxis Airoli, Teeth Cleaning Navi Mumbai, Scaling and Polishing, Preventive Dentistry',
    },
    h1: 'Professional Oral Prophylaxis in Airoli',
    heroDescription: 'Ultrasonic cleaning and polishing for a pristine, healthy smile.',
    content: [
      'Oral prophylaxis is a thorough professional cleaning that goes far beyond daily brushing and flossing. It is the cornerstone of preventive dentistry.',
      'Using advanced ultrasonic scalers, we gently and painlessly remove hardened plaque (tartar) and calculus from above and below the gumline. This prevents periodontal disease and stops tooth decay in its tracks.',
      'The procedure concludes with a high-gloss polish to remove superficial stains, leaving your teeth feeling incredibly smooth and looking noticeably brighter.'
    ],
    faqs: [
      {
        q: 'How often should I get professional teeth cleaning?',
        a: 'We recommend scheduling an oral prophylaxis every 6 months to maintain optimal oral health and catch any potential issues early.'
      },
      {
        q: 'Is ultrasonic scaling painful?',
        a: 'Not at all. Ultrasonic scaling uses high-frequency vibrations and a gentle water spray to break down tartar. It is completely painless and much faster than manual scaling.'
      }
    ]
  },
  {
    slug: 'gum-therapy',
    title: 'Gum Therapy',
    category: 'Preventive',
    navDescription: 'Advanced periodontal care for healthy gums.',
    image: '/treatments/gum-therapy.png',
    seo: {
      title: 'Gum Therapy & Periodontal Care in Airoli | DANTVED CLINIC',
      description: 'Expert periodontal treatments to cure bleeding gums and gingivitis. Restore your gum health at DANTVED CLINIC in Navi Mumbai.',
      keywords: 'Gum Therapy Airoli, Periodontal Care Navi Mumbai, Bleeding Gums Treatment, Gingivitis Cure',
    },
    h1: 'Advanced Periodontal Care & Gum Therapy',
    heroDescription: 'Restore the foundation of your smile with expert gum disease treatment.',
    content: [
      'Healthy gums are the critical foundation of a beautiful smile. When bacteria penetrate beneath the gumline, it can lead to gingivitis or advanced periodontal disease, causing bleeding, swelling, and eventual bone loss.',
      'Our comprehensive gum therapy includes deep root planing and scaling to meticulously clear away deep-seated bacteria and smooth the tooth roots, promoting gum reattachment.',
      'We also utilize diode lasers for precise, minimally invasive gum decontamination, accelerating healing and reducing discomfort significantly.'
    ],
    faqs: [
      {
        q: 'What are the signs of gum disease?',
        a: 'Common signs include red, swollen, or tender gums, bleeding while brushing or flossing, persistent bad breath, and receding gumlines.'
      },
      {
        q: 'Can gum disease be cured?',
        a: 'In its early stages (gingivitis), it is completely reversible. In more advanced stages (periodontitis), it can be successfully managed and halted to prevent further bone loss.'
      }
    ]
  },

  // --- RESTORATIVE ---
  {
    slug: 'fillings',
    title: 'Fillings & Restorations',
    category: 'Restorative',
    navDescription: 'Tooth-colored composite restorations.',
    image: '/treatments/fillings.png',
    seo: {
      title: 'Tooth-Colored Fillings in Airoli | DANTVED CLINIC',
      description: 'Restore decayed or chipped teeth invisibly with premium composite fillings. Safe, durable, and aesthetically perfect dental restorations in Navi Mumbai.',
      keywords: 'Tooth Colored Fillings Airoli, Composite Restorations Navi Mumbai, Cavity Treatment, Invisible Fillings',
    },
    h1: 'Aesthetic Composite Fillings & Restorations',
    heroDescription: 'Invisible, highly durable restorations that blend perfectly with your natural teeth.',
    content: [
      'Modern dentistry has moved far beyond dark silver amalgams. Our tooth-colored composite restorations repair cavities and minor fractures invisibly.',
      'We use premium, high-strength nano-composite resins that are meticulously shade-matched to your natural enamel. The material is sculpted directly onto the tooth and hardened instantly with a specialized curing light.',
      'These restorations not only look completely natural but also bond chemically to the tooth structure, restoring its original strength and preventing further decay.'
    ],
    faqs: [
      {
        q: 'How long do composite fillings last?',
        a: 'With good oral hygiene, composite fillings typically last between 7 to 10 years, and often longer. They are highly durable for normal chewing forces.'
      },
      {
        q: 'Is the filling procedure painful?',
        a: 'No. We use local anesthesia to ensure the tooth is completely numb before carefully removing any decay and placing the restoration.'
      }
    ]
  },
  {
    slug: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    category: 'Restorative',
    navDescription: 'Painless single-visit endodontic therapy.',
    image: '/treatments/root-canal.png',
    seo: {
      title: 'Painless Root Canal Treatment in Airoli | DANTVED CLINIC',
      description: 'Eliminate tooth pain and save your natural tooth with painless, single-visit root canal therapy at DANTVED CLINIC, Airoli. Call for emergency dental relief.',
      keywords: 'Root Canal Airoli, Painless Root Canal Navi Mumbai, Single Visit RCT, Endodontist Dentist Airoli',
    },
    h1: 'Single-Visit Painless Root Canal Treatment',
    heroDescription: 'Advanced endodontic therapy to save infected teeth and provide immediate relief.',
    content: [
      'Root canal treatment (RCT) is a highly routine therapeutic procedure performed to save an infected or severely decayed tooth, avoiding the need for extraction.',
      'We use state-of-the-art rotary endodontics, digital apex locators, and warm obturation systems to perform root canals with absolute precision, often completing the treatment in a single comfortable session.',
      'By removing the inflamed nerve tissue, sanitizing the canal space, and sealing it, we eliminate pain and secure the structural integrity of your natural tooth.'
    ],
    faqs: [
      {
        q: 'Is a root canal painful?',
        a: 'No. Modern anesthetics and rotary tools make root canals as comfortable and pain-free as a standard dental filling. It is performed to relieve pain, not cause it.'
      },
      {
        q: 'Is a crown necessary after a root canal?',
        a: 'Yes, in most cases. A root canal removes the tooth\'s blood supply, making it brittle. A custom zirconia or ceramic crown is highly recommended to protect it from fracturing.'
      }
    ]
  },
  {
    slug: 'crowns',
    title: 'Dental Crowns',
    category: 'Restorative',
    navDescription: 'Premium zirconia and ceramic protective caps.',
    image: '/treatments/crowns.png',
    seo: {
      title: 'Zirconia & Ceramic Dental Crowns in Airoli | DANTVED CLINIC',
      description: 'Protect damaged teeth with high-strength, natural-looking Zirconia and E-max ceramic crowns. Precision fit and long-lasting durability in Navi Mumbai.',
      keywords: 'Dental Crowns Airoli, Zirconia Caps Navi Mumbai, Ceramic Tooth Cover, Teeth Cap',
    },
    h1: 'Premium Zirconia & Ceramic Crowns',
    heroDescription: 'Exceptional strength and lifelike aesthetics to protect and restore damaged teeth.',
    content: [
      'A dental crown is a custom-made cap that completely encases a damaged, heavily filled, or root-canal-treated tooth, restoring its original shape, size, and strength.',
      'We specialize in metal-free restorations, utilizing highly translucent Zirconia and E-max ceramics. These materials mimic the light-reflecting properties of natural enamel while providing incredible bite resilience.',
      'Through digital impressions and precision milling, your crown will feature a flawless marginal fit, preventing future decay and perfectly matching the shade of your adjacent teeth.'
    ],
    faqs: [
      {
        q: 'What is the difference between Zirconia and PFM crowns?',
        a: 'Zirconia is a 100% metal-free, highly aesthetic, and incredibly strong ceramic. PFM (Porcelain Fused to Metal) crowns have a dark metal core which can sometimes show a grey line at the gums. We highly recommend Zirconia for its superior aesthetics and biocompatibility.'
      },
      {
        q: 'How many appointments are needed for a crown?',
        a: 'Typically two. The first visit involves tooth preparation and digital scanning. You will receive a temporary crown while our lab fabricates your final ceramic crown, which is permanently bonded during the second visit.'
      }
    ]
  },
  {
    slug: 'bridges',
    title: 'Dental Bridges',
    category: 'Restorative',
    navDescription: 'Fixed replacement for one or more missing teeth.',
    image: '/treatments/bridges.png',
    seo: {
      title: 'Fixed Dental Bridges in Airoli | DANTVED CLINIC',
      description: 'Replace missing teeth rapidly with custom fixed dental bridges. Highly aesthetic and durable ceramic restorations at DANTVED CLINIC, Navi Mumbai.',
      keywords: 'Dental Bridges Airoli, Fixed Teeth Replacement Navi Mumbai, Ceramic Bridge, Tooth Gap Closure',
    },
    h1: 'Custom Fixed Dental Bridges',
    heroDescription: 'Seamlessly bridge the gap of missing teeth with strong, fixed ceramic restorations.',
    content: [
      'A dental bridge is a fixed prosthetic device used to replace one or more missing teeth by anchoring an artificial tooth to the adjacent natural teeth.',
      'If you are missing a tooth but are not an ideal candidate for an implant, a bridge is an excellent, rapid solution. It restores your chewing ability, prevents remaining teeth from shifting, and maintains your facial shape.',
      'Our bridges are fabricated from premium ceramics and zirconia, ensuring the pontic (false tooth) blends imperceptibly with your natural smile.'
    ],
    faqs: [
      {
        q: 'How is a dental bridge attached?',
        a: 'The teeth adjacent to the gap are gently reshaped to accommodate crowns. These crowns serve as anchors, holding the replacement tooth securely in the middle.'
      },
      {
        q: 'How do I clean underneath a dental bridge?',
        a: 'Since the replacement tooth rests on the gums, you will use specialized floss threaders or an interdental brush to easily clean beneath the pontic and maintain healthy gums.'
      }
    ]
  },

  // --- SURGICAL ---
  {
    slug: 'extraction-impacted-teeth',
    title: 'Extraction & Impacted Teeth',
    category: 'Surgical',
    navDescription: 'Painless removal including wisdom teeth.',
    image: '/treatments/oral-surgery.png',
    seo: {
      title: 'Wisdom Tooth Extraction & Oral Surgery in Airoli',
      description: 'Expert surgical care at DANTVED CLINIC. Pain-free wisdom teeth extractions and minor oral surgeries in a sterile, premium clinic environment.',
      keywords: 'Wisdom Tooth Extraction Airoli, Tooth Removal Navi Mumbai, Impacted Tooth Surgery, Painless Extraction',
    },
    h1: 'Expert Wisdom Tooth Extraction & Surgical Care',
    heroDescription: 'Safe, painless removal of problematic or impacted teeth under strict sterile protocols.',
    content: [
      'Tooth extraction is often necessary to protect your overall oral health when a tooth is unsalvageable due to severe decay, advanced gum disease, or traumatic injury.',
      'We also specialize in the surgical removal of impacted wisdom teeth. When third molars lack adequate space to erupt properly, they can cause chronic pain, crowding, and recurrent infections. Our surgical team approaches these complex extractions with absolute precision.',
      'Utilizing advanced imaging, piezosurgery, and profound local anesthesia, we ensure the procedure is entirely painless, minimally invasive, and followed by a rapid, comfortable recovery.'
    ],
    faqs: [
      {
        q: 'What is the recovery time after a wisdom tooth extraction?',
        a: 'Most patients recover fully within 3 to 5 days. We provide detailed postoperative guidelines, cold therapy advice, and prescribed medications to keep you comfortable.'
      },
      {
        q: 'Will I feel pain during the extraction?',
        a: 'No. You will feel pressure, but absolutely no pain. We ensure the area is profoundly numb before proceeding, prioritizing your comfort above all else.'
      }
    ]
  },
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    category: 'Surgical',
    navDescription: 'Permanent titanium tooth root replacements.',
    isPopular: true,
    image: '/treatments/dental-implants.png',
    seo: {
      title: 'Dental Implants in Airoli, Navi Mumbai | Tooth Restoration Specialist',
      description: 'Replace missing teeth permanently with premium dental implants at DANTVED CLINIC, Airoli. Pain-free treatment under Dr. Siddharth Vaish. Call today.',
      keywords: 'Dental Implants Airoli, Tooth Implant Navi Mumbai, Best Implantologist Airoli, Dr Siddharth Vaish, Permanent Teeth Replacement',
    },
    h1: 'Premium Dental Implants in Airoli',
    heroDescription: 'Permanent, natural-looking tooth replacement with lifetime durability.',
    content: [
      'Dental implants represent the gold standard in modern tooth replacement, offering a permanent, highly stable solution that mimics both the function and aesthetic of a natural tooth root.',
      'Led by Dr. Siddharth Vaish, our clinic uses state-of-the-art 3D CBCT imaging to map bone density and locate exact placement paths, ensuring maximum longevity and comfort with a 98% success rate.',
      'Whether you require a single implant, a multi-unit bridge, or a complete implant-supported denture, we use premium biocompatible titanium and zirconia implants to rebuild your smile from the foundation.'
    ],
    faqs: [
      {
        q: 'Are dental implants painful?',
        a: 'Most patients report that having a dental implant placed is surprisingly comfortable. We use advanced local anesthesia and offer sedation options for a completely pain-free experience.'
      },
      {
        q: 'How long do dental implants last?',
        a: 'With proper care and good oral hygiene, dental implants can last a lifetime. The crown placed on top may require replacement after 10-15 years due to natural wear.'
      },
      {
        q: 'How long does the implant process take?',
        a: 'The complete process generally ranges from 3 to 6 months, allowing the implant to fully fuse with your jawbone (osseointegration) before mounting the final crown.'
      }
    ]
  },

  // --- PROSTHODONTICS ---
  {
    slug: 'removable-dentures',
    title: 'Removable Dentures',
    category: 'Prosthodontics',
    navDescription: 'Comfortable partial and complete dentures.',
    image: '/treatments/dentures.png',
    seo: {
      title: 'Custom Partial & Complete Dentures in Airoli | DANTVED CLINIC',
      description: 'Regain your chewing ability and confident smile with custom partial or complete dentures at DANTVED CLINIC. Lightweight and precision-fit for maximum comfort.',
      keywords: 'Custom Dentures Airoli, Complete Dentures Navi Mumbai, Partial Dentures, Removable Teeth Replacement',
    },
    h1: 'Comfortable Custom Removable Dentures',
    heroDescription: 'Lightweight, natural-looking partial and complete removable dental prosthetics.',
    content: [
      'Removable dentures are custom-fit prosthetics designed to replace missing teeth and support surrounding facial tissues, restoring speech and chewing capacity.',
      'Our modern dentures utilize lightweight, medical-grade materials such as flexible Valplast resins and high-strength acrylics that fit securely without messy adhesives.',
      'Each set is personalized to establish natural tooth alignment and correct vertical height, providing support to the lips and cheeks for a youthful, refreshed appearance.'
    ],
    faqs: [
      {
        q: 'How long does it take to get used to new dentures?',
        a: 'Most patients adapt to new dentures within 2 to 4 weeks. Normal speech and eating return quickly as your mouth and muscles adjust to the new prosthetic.'
      },
      {
        q: 'How should I clean my dentures?',
        a: 'Dentures should be brushed daily with a soft-bristle brush and non-abrasive denture cleanser, and soaked overnight in water or a specialized denture soaking solution.'
      }
    ]
  },
  {
    slug: 'implant-overdentures',
    title: 'Implant Overdentures',
    category: 'Prosthodontics',
    navDescription: 'Snap-on dentures for rock-solid stability.',
    image: '/treatments/dental-implants.png',
    seo: {
      title: 'Implant Supported Overdentures in Airoli | DANTVED CLINIC',
      description: 'Say goodbye to loose, slipping dentures. Implant-supported snap-on overdentures offer incredible stability and chewing power. Consult Dr. Siddharth Vaish.',
      keywords: 'Implant Overdentures Airoli, Snap On Dentures Navi Mumbai, Implant Supported Dentures, Denture Stabilization',
    },
    h1: 'Implant-Supported Overdentures',
    heroDescription: 'Experience the confidence of rock-solid, snap-on dentures that never slip.',
    content: [
      'If you struggle with loose, slipping conventional dentures, implant-supported overdentures are a life-changing upgrade. These "snap-on" dentures attach securely to two or more dental implants placed in the jawbone.',
      'This hybrid approach combines the affordability of dentures with the incredible stability of implants. It completely eliminates the need for messy adhesives and allows you to bite into harder foods with confidence.',
      'The implants also stimulate the jawbone, preventing the rapid bone loss and facial collapse typically associated with missing teeth and traditional dentures.'
    ],
    faqs: [
      {
        q: 'Are overdentures removable?',
        a: 'Yes, implant-supported overdentures "snap" onto abutments but are easily removed by the patient for daily cleaning and overnight soaking.'
      },
      {
        q: 'Can my existing dentures be modified into overdentures?',
        a: 'In some cases, if your current denture is relatively new and made of high-quality acrylic, we can retrofit it with snap-attachments after placing the implants.'
      }
    ]
  },
  {
    slug: 'full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation',
    category: 'Prosthodontics',
    navDescription: 'Comprehensive bite and aesthetic reconstruction.',
    image: '/treatments/full-mouth-rehabilitation.png',
    dark: true,
    seo: {
      title: 'Full Mouth Rehabilitation in Airoli | DANTVED CLINIC',
      description: 'Restore your entire bite, alignment, and smile aesthetics. Expert full mouth reconstruction led by Prosthodontist Dr. Siddharth Vaish in Navi Mumbai.',
      keywords: 'Full Mouth Rehabilitation Airoli, Full Mouth Reconstruction Navi Mumbai, Best Prosthodontist Airoli, Complete Bite Correction',
    },
    h1: 'Full Mouth Rehabilitation & Reconstruction',
    heroDescription: 'Comprehensive restorative care to return complete function, comfort, and aesthetics.',
    content: [
      'Full mouth rehabilitation is a highly specialized reconstructive treatment that rebuilds or restores all of the teeth in both the upper and lower jaws.',
      'This comprehensive therapy is tailored for patients experiencing widespread tooth wear, multiple missing teeth, jaw joint issues (TMJ/TMD), or compromised bite alignment.',
      'Led by our chief Prosthodontist Dr. Siddharth Vaish, we reconstruct your dental health using a calculated mix of implants, crowns, veneers, and onlays, establishing a functional bite and a radiant smile.'
    ],
    faqs: [
      {
        q: 'Who is a candidate for full mouth rehabilitation?',
        a: 'Patients with multiple missing teeth, severe acid erosion, heavy grinding wear, or chronic jaw pain due to an uneven bite are ideal candidates for full mouth reconstruction.'
      },
      {
        q: 'How long does full mouth reconstruction take?',
        a: 'Due to its comprehensive nature, treatment is planned in phases and can span from 1 to 4 months to allow proper healing and bite adjustments.'
      }
    ]
  },
  {
    slug: 'maxillofacial-prosthesis',
    title: 'Maxillofacial Prosthesis',
    category: 'Prosthodontics',
    navDescription: 'Rehabilitation of oral and facial defects.',
    image: '/treatments/maxillofacial-prosthesis.png',
    seo: {
      title: 'Maxillofacial Prosthesis in Airoli | Dr. Siddharth Vaish',
      description: 'Specialized maxillofacial prosthetics to restore oral and facial defects caused by trauma, surgery, or congenital conditions. Expert care by Dr. Siddharth Vaish.',
      keywords: 'Maxillofacial Prosthesis Airoli, Obturators Navi Mumbai, Oral Defect Prosthetics, Prosthodontist Expert',
    },
    h1: 'Specialized Maxillofacial Prosthetics',
    heroDescription: 'Advanced rehabilitation for structural and functional defects of the mouth and jaws.',
    content: [
      'Maxillofacial prosthodontics is a highly advanced subspecialty focusing on the rehabilitation of patients with congenital, acquired, or surgical defects of the head and neck.',
      'As a trained Prosthodontist, Dr. Siddharth Vaish designs custom intraoral prosthetics such as palatal obturators, speech-aid prostheses, and surgical stents to restore swallowing, speech, and chewing functions.',
      'Working closely with oncologists and oral surgeons, we create meticulously crafted prosthetics that dramatically improve the quality of life and confidence of our patients.'
    ],
    faqs: [
      {
        q: 'What is a palatal obturator?',
        a: 'An obturator is a custom prosthetic device that covers an opening or defect in the roof of the mouth (palate), often required after tumor resection surgery. It separates the oral and nasal cavities to enable normal eating and speaking.'
      },
      {
        q: 'Are these prosthetics comfortable to wear?',
        a: 'Yes. They are fabricated from lightweight, medical-grade materials and meticulously adjusted to ensure a secure, highly comfortable fit that integrates with your natural tissues.'
      }
    ]
  },

  // --- COSMETIC ---
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'Cosmetic',
    navDescription: 'Fast, safe laser brightening treatments.',
    image: '/treatments/teeth-whitening.png',
    seo: {
      title: 'Professional Teeth Whitening in Airoli | DANTVED CLINIC',
      description: 'Brighten your smile by up to 8 shades in just one hour. Safe, non-invasive laser teeth whitening treatments at DANTVED CLINIC in Navi Mumbai.',
      keywords: 'Teeth Whitening Airoli, Laser Teeth Bleaching Navi Mumbai, Smile Brightening, Dental Stains Removal',
    },
    h1: 'Laser Teeth Whitening & Brightening',
    heroDescription: 'Safe, fast laser whitening to lift deep stains and reveal a brilliant smile.',
    content: [
      'Professional teeth whitening is a fast, safe, and non-invasive cosmetic treatment designed to remove stubborn stains and restore a youthful, bright color to your teeth.',
      'We use premium, enamel-safe bleaching gels activated by customized laser light, targeting deep discoloration from coffee, tea, smoking, and natural aging without affecting enamel structure.',
      'Whether you choose an instant in-office laser session or a customized take-home whitening kit, we ensure your gums are protected and tooth sensitivity is minimized throughout.'
    ],
    faqs: [
      {
        q: 'How long do teeth whitening results last?',
        a: 'Typically, results last between 1 to 3 years. This varies based on your dietary habits; avoiding highly staining foods like red wine, tea, and coffee helps maintain the brightness.'
      },
      {
        q: 'Does whitening cause tooth sensitivity?',
        a: 'We use premium desensitizing agents and paced laser sessions to ensure minimal post-treatment sensitivity. Any mild sensitivity usually resolves within 24 hours.'
      }
    ]
  },
  {
    slug: 'veneers',
    title: 'Porcelain Veneers',
    category: 'Cosmetic',
    navDescription: 'Ultra-thin aesthetic ceramic shells.',
    image: '/treatments/veneers.png',
    seo: {
      title: 'Porcelain Veneers in Airoli, Navi Mumbai | Cosmetic Dentistry',
      description: 'Transform chipped, discolored, or misaligned teeth with ultra-thin porcelain veneers at DANTVED CLINIC. Hand-crafted aesthetics for a natural, premium finish.',
      keywords: 'Porcelain Veneers Airoli, Dental Veneers Navi Mumbai, Cosmetic Teeth Laminates, Smile Correction Veneer',
    },
    h1: 'Ultra-Thin Handcrafted Porcelain Veneers',
    heroDescription: 'Bespoke porcelain shells for a flawless, luminous, and perfectly proportioned smile.',
    content: [
      'Porcelain veneers are micro-thin shells of dental ceramic custom-crafted to fit over the front surface of your teeth, instantly correcting cosmetic concerns.',
      'At DANTVED CLINIC, we emphasize ultra-conservative preparation, preserving as much of your natural enamel as possible. Veneers are ideal for correcting chips, stubborn discoloration, small gaps, and minor crowding.',
      'Each veneer is hand-finished by master dental technicians to replicate the translucency, texture, and light-reflecting properties of real teeth, producing a beautiful, long-lasting restoration.'
    ],
    faqs: [
      {
        q: 'How long do porcelain veneers last?',
        a: 'With proper care, our custom porcelain veneers can last 10-15 years or longer. They are highly resistant to stains and incredibly durable.'
      },
      {
        q: 'Does getting veneers require shaving my teeth?',
        a: 'We practice conservative dentistry. Only a microscopic layer of enamel (about 0.3mm to 0.5mm) is gently prepared to ensure a seamless fit for the veneers.'
      }
    ]
  },
  {
    slug: 'smile-designing',
    title: 'Smile Designing',
    category: 'Cosmetic',
    navDescription: 'Digital makeover planning for perfection.',
    isPopular: true,
    image: '/treatments/smile-designing.png',
    seo: {
      title: 'Smile Designing & Makeovers in Airoli | DANTVED CLINIC',
      description: 'Sculpt your dream smile. Get a personalized digital smile design makeover combining veneers, whitening, and custom alignment at DANTVED CLINIC Navi Mumbai.',
      keywords: 'Smile Designing Airoli, Cosmetic Makeover Navi Mumbai, Digital Smile Design, Teeth Aesthetics, Smile Makeover Doctor',
    },
    h1: 'Digital Smile Designing Makeovers',
    heroDescription: 'State-of-the-art cosmetic makeovers mathematically tailored to your facial proportions.',
    content: [
      'Smile designing is an artistic, multi-disciplinary approach to crafting a beautiful, natural-looking smile that matches your unique facial structure, lip line, and skin tone.',
      'We utilize next-generation digital smile design (DSD) software to preview and fine-tune your new teeth on screen before any clinical preparation begins, giving you full control over your aesthetic transformation.',
      'Our custom makeovers seamlessly blend porcelain veneers, cosmetic bonding, laser gum contouring, and alignment corrections to deliver a smile that looks radiant yet entirely natural.'
    ],
    faqs: [
      {
        q: 'What is Digital Smile Designing?',
        a: 'Digital Smile Designing (DSD) is a dental planning tool that uses digital photography and 3D modeling to analyze your facial proportions and design a customized smile before treatment starts.'
      },
      {
        q: 'How many visits does a smile makeover require?',
        a: 'Most smile makeovers are completed in 2 to 3 visits spread over a couple of weeks, depending on the combination of treatments required.'
      }
    ]
  },

  // --- ALIGNMENT ---
  {
    slug: 'orthodontic-treatment',
    title: 'Orthodontic Treatment',
    category: 'Alignment',
    navDescription: 'Traditional and ceramic braces for complex bites.',
    image: '/treatments/orthodontic-treatment.png',
    seo: {
      title: 'Orthodontic Braces Treatment in Airoli | DANTVED CLINIC',
      description: 'Correct misaligned teeth and complex bite issues with advanced metal and ceramic braces at DANTVED CLINIC, Airoli. Schedule your orthodontic consultation.',
      keywords: 'Orthodontic Treatment Airoli, Dental Braces Navi Mumbai, Ceramic Braces, Teeth Alignment Clinic',
    },
    h1: 'Advanced Orthodontic Braces Therapy',
    heroDescription: 'Precise, predictable alignment for perfectly straight teeth and a healthy bite.',
    content: [
      'Orthodontic treatment goes beyond mere aesthetics; it corrects bite discrepancies (malocclusions) that can cause uneven tooth wear, jaw pain, and difficulty in cleaning.',
      'We offer a full spectrum of traditional orthodontic solutions, including highly durable metal braces and discreet, tooth-colored ceramic brackets. These systems are highly effective for correcting complex crowding, severe spacing, and pronounced overbites.',
      'Our approach focuses on achieving a harmonious balance between your teeth, jaw joints, and facial profile, ensuring results that are both visually stunning and functionally stable.'
    ],
    faqs: [
      {
        q: 'At what age should orthodontic treatment begin?',
        a: 'While braces are common for teenagers, interceptive orthodontics can begin as early as age 7 to guide jaw growth. However, adults of any age can successfully undergo orthodontic treatment.'
      },
      {
        q: 'How long do I need to wear braces?',
        a: 'Treatment length varies widely depending on case complexity, but typical treatments span between 12 to 24 months.'
      }
    ]
  },
  {
    slug: 'clear-aligners',
    title: 'Clear Aligners',
    category: 'Alignment',
    navDescription: 'Nearly invisible, removable orthodontic trays.',
    isPopular: true,
    image: '/treatments/clear-aligners.png',
    dark: true,
    seo: {
      title: 'Clear Aligners in Airoli, Navi Mumbai | Invisible Braces',
      description: 'Straighten your teeth comfortably with Clear Aligners at DANTVED CLINIC, Airoli. Removable, comfortable, and nearly invisible. Book a scan today.',
      keywords: 'Clear Aligners Airoli, Invisible Braces Navi Mumbai, Transparent Aligners, Orthodontic Teeth Straightening',
    },
    h1: 'Invisible Clear Aligners Orthodontics',
    heroDescription: 'Straighten your smile comfortably using nearly invisible custom aligners designed for everyday life.',
    content: [
      'Clear aligners are a modern, comfortable, and virtually invisible orthodontic solution designed to straighten your teeth and correct your bite without the hassle of traditional metal braces.',
      'At DANTVED CLINIC, we use advanced 3D intraoral scans to create a precise digital model of your mouth. We then map out your complete treatment plan, showing you how your teeth will shift step-by-step before your aligners are even fabricated.',
      'Each set of custom aligners is made of smooth, medical-grade, BPA-free plastic that fits snugly over your teeth, gently and continuously shifting them into their ideal positions.'
    ],
    faqs: [
      {
        q: 'How long do I need to wear aligners each day?',
        a: 'For optimal results, aligners should be worn for 20 to 22 hours per day, removing them only to eat, drink hot liquids, brush, and floss.'
      },
      {
        q: 'Are clear aligners comfortable?',
        a: 'Yes, clear aligners are designed for comfort. While you may feel a slight pressure for the first day or two of a new set of trays, they are made of smooth plastic that won\'t irritate your lips or cheeks.'
      }
    ]
  },

  // --- FUNCTIONAL / TMJ ---
  {
    slug: 'night-guards',
    title: 'Custom Night Guards',
    category: 'Functional / TMJ',
    navDescription: 'Protect enamel from heavy grinding.',
    image: '/treatments/night-guards.png',
    seo: {
      title: 'Custom Dental Night Guards in Airoli | Teeth Grinding Relief',
      description: 'Protect your teeth from grinding (bruxism) and prevent enamel wear with a custom-fit, comfortable night guard from DANTVED CLINIC in Navi Mumbai.',
      keywords: 'Night Guard Airoli, Dental Splint Navi Mumbai, Teeth Grinding Protector, Bruxism Mouth Guard',
    },
    h1: 'Custom-Fit Protective Night Guards',
    heroDescription: 'Defend your teeth against subconscious grinding and clenching while you sleep.',
    content: [
      'Bruxism, the subconscious grinding and clenching of teeth during sleep, can cause catastrophic damage to your tooth enamel, lead to micro-fractures, and destroy expensive dental work over time.',
      'A custom-fabricated night guard acts as a durable, shock-absorbing barrier between your upper and lower teeth. Unlike bulky over-the-counter guards, our custom splints are precision-milled from digital scans to ensure a slim, comfortable fit.',
      'Wearing a night guard not only protects your enamel but also helps to relax the jaw muscles, reducing morning headaches and facial tension.'
    ],
    faqs: [
      {
        q: 'How do I know if I grind my teeth at night?',
        a: 'Common symptoms include waking up with a dull headache or sore jaw muscles, noticing flattened or chipped teeth, or having a partner hear grinding sounds while you sleep.'
      },
      {
        q: 'How long does a custom night guard last?',
        a: 'Depending on the severity of your grinding, a high-quality acrylic night guard can last anywhere from 3 to 5 years before needing replacement due to wear.'
      }
    ]
  },
  {
    slug: 'tmj-therapy',
    title: 'TMJ & Bruxism Therapy',
    category: 'Functional / TMJ',
    navDescription: 'Relief for jaw joint pain and tension.',
    image: '/treatments/tmj-therapy.png',
    seo: {
      title: 'TMJ & Bruxism Therapy in Airoli | Jaw Pain Relief',
      description: 'Get relief from chronic jaw pain, clicking joints, and tension headaches with specialized TMJ and Bruxism therapy at DANTVED CLINIC, Navi Mumbai.',
      keywords: 'TMJ Therapy Airoli, Jaw Pain Relief Navi Mumbai, TMJ Specialist, Bruxism Treatment Dentist',
    },
    h1: 'Comprehensive TMJ & Bruxism Therapy',
    heroDescription: 'Targeted relief for chronic jaw pain, clicking joints, and debilitating tension headaches.',
    content: [
      'The Temporomandibular Joint (TMJ) connects your jawbone to your skull. When this joint is inflamed or improperly aligned, it leads to Temporomandibular Disorder (TMD), characterized by sharp jaw pain, earaches, and painful clicking when chewing.',
      'Our TMJ therapy involves a meticulous diagnosis of your bite mechanics and joint health. We employ a multidisciplinary approach that may include occlusal adjustments, specialized oral appliances (splints), and muscle relaxation techniques.',
      'By correcting the underlying disharmony between your teeth, muscles, and jaw joints, we aim to provide lasting relief from chronic pain and restore smooth, comfortable jaw function.'
    ],
    faqs: [
      {
        q: 'What causes TMJ disorders?',
        a: 'TMJ disorders can be caused by a variety of factors including chronic teeth grinding (bruxism), arthritis in the joint, a misaligned bite, or physical trauma to the jaw or face.'
      },
      {
        q: 'Will I need surgery for my TMJ pain?',
        a: 'Surgery is extremely rare and only considered as an absolute last resort. The vast majority of TMJ issues are successfully resolved using conservative, non-surgical therapies like custom splints and physical therapy.'
      }
    ]
  }
];

// Helper to group services by category
export const getServicesByCategory = () => {
  const grouped: Record<ServiceCategory, ServiceDetail[]> = {
    'Preventive': [],
    'Restorative': [],
    'Surgical': [],
    'Prosthodontics': [],
    'Cosmetic': [],
    'Alignment': [],
    'Functional / TMJ': []
  };
  
  services.forEach(service => {
    grouped[service.category].push(service);
  });
  
  return grouped;
};
