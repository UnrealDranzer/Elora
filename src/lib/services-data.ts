export type ServiceDetail = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  image: string;
  dark?: boolean;
  content: string[];
  faqs: { q: string; a: string }[];
};

export const servicesData: Record<string, ServiceDetail> = {
  'dental-implants': {
    slug: 'dental-implants',
    title: 'Dental Implants',
    h1: 'Premium Dental Implants in Airoli, Navi Mumbai',
    description: 'Permanent, natural-looking tooth replacement with lifetime durability.',
    metaTitle: 'Dental Implants in Airoli, Navi Mumbai | Tooth Restoration Specialist',
    metaDescription: 'Replace missing teeth permanently with premium dental implants at Dantved Clinic, Airoli. Pain-free treatment under Dr. Siddharth Vaish. Call today.',
    keywords: 'Dental Implants Airoli, Tooth Implant Navi Mumbai, Best Implantologist Airoli, Dr Siddharth Vaish, Permanent Teeth Replacement',
    image: '/treatments/dental-implants.png',
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
  'smile-designing': {
    slug: 'smile-designing',
    title: 'Smile Designing',
    h1: 'Digital Smile Designing & Makeovers in Airoli',
    description: 'State-of-the-art cosmetic makeovers tailored to your facial proportions.',
    metaTitle: 'Smile Designing & Makeovers in Airoli | Dantved Clinic',
    metaDescription: 'Sculpt your dream smile. Get a personalized digital smile design makeover combining veneers, whitening, and custom alignment at Dantved Clinic Navi Mumbai.',
    keywords: 'Smile Designing Airoli, Cosmetic Makeover Navi Mumbai, Digital Smile Design, Teeth Aesthetics, Smile Makeover Doctor',
    image: '/treatments/smile-designing.png',
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
  'veneers': {
    slug: 'veneers',
    title: 'Porcelain Veneers',
    h1: 'Ultra-Thin Porcelain Veneers in Airoli, Navi Mumbai',
    description: 'Bespoke hand-crafted porcelain shells for a flawless, luminous smile.',
    metaTitle: 'Porcelain Veneers in Airoli, Navi Mumbai | Cosmetic Dentistry',
    metaDescription: 'Transform chipped, discolored, or misaligned teeth with ultra-thin porcelain veneers at Dantved Clinic. Hand-crafted aesthetics for a natural, premium finish.',
    keywords: 'Porcelain Veneers Airoli, Dental Veneers Navi Mumbai, Cosmetic Teeth Laminates, Smile Correction Veneer',
    image: '/treatments/veneers.png',
    content: [
      'Porcelain veneers are micro-thin shells of dental ceramic custom-crafted to fit over the front surface of your teeth, instantly correcting cosmetic concerns.',
      'At Dantved Clinic, we emphasize ultra-conservative preparation, preserving as much of your natural enamel as possible. Veneers are ideal for correcting chips, stubborn discoloration, small gaps, and minor crowding.',
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
  'crowns-bridges': {
    slug: 'crowns-bridges',
    title: 'Crowns & Bridges',
    h1: 'Premium Crowns & Bridges in Airoli, Navi Mumbai',
    description: 'Precision zirconia and ceramic restorations to rebuild tooth strength and integrity.',
    metaTitle: 'Dental Crowns & Bridges in Airoli | Zirconia restorations',
    metaDescription: 'Restore damaged or missing teeth with high-strength zirconia and ceramic crowns and bridges at Dantved Clinic. Expertly crafted for comfort, function, and aesthetics.',
    keywords: 'Dental Crowns Airoli, Zirconia Crown Navi Mumbai, Dental Bridge Specialist, Tooth Cap Airoli',
    image: '/treatments/crowns-bridges.png',
    dark: true,
    content: [
      'Dental crowns and bridges are key restorative treatments designed to restore the strength, function, and appearance of severely damaged, fractured, or missing teeth.',
      'A crown protects a single weakened tooth, shielding it from further breakdown, while a bridge spans the gap left by missing teeth, anchored securely to adjacent healthy teeth or dental implants.',
      'We use top-grade materials including CAD/CAM-milled Zirconia (monolithic and layered) and E.max lithium disilicate, guaranteeing structural integrity, biocompatibility, and a highly natural finish.'
    ],
    faqs: [
      {
        q: 'What is the difference between a crown and a bridge?',
        a: 'A crown is a custom cap that covers a single damaged tooth. A bridge is a restoration used to fill a gap created by one or more missing teeth, anchored to teeth on either side.'
      },
      {
        q: 'How long do dental crowns last?',
        a: 'A premium zirconia or ceramic crown typically lasts between 10 to 15 years, and frequently longer when maintained with regular checkups and good hygiene.'
      }
    ]
  },
  'full-mouth-rehabilitation': {
    slug: 'full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation',
    h1: 'Full Mouth Rehabilitation & Reconstruction in Airoli',
    description: 'Comprehensive restorative care to return complete function, comfort, and aesthetics.',
    metaTitle: 'Full Mouth Rehabilitation in Airoli | Dantved Clinic',
    metaDescription: 'Restore your entire bite, alignment, and smile aesthetics. Expert full mouth reconstruction led by Prosthodontist Dr. Siddharth Vaish in Navi Mumbai.',
    keywords: 'Full Mouth Rehabilitation Airoli, Full Mouth Reconstruction Navi Mumbai, Best Prosthodontist Airoli, Complete Bite Correction',
    image: '/treatments/full-mouth-rehabilitation.png',
    dark: true,
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
  'dentures': {
    slug: 'dentures',
    title: 'Custom Dentures',
    h1: 'Comfortable Custom Dentures in Airoli, Navi Mumbai',
    description: 'Lightweight, natural-looking partial and complete removable dental prosthetics.',
    metaTitle: 'Custom Partial & Complete Dentures in Airoli | Dantved Clinic',
    metaDescription: 'Regain your chewing ability and confident smile with custom partial or complete dentures at Dantved Clinic. Lightweight and precision-fit for maximum comfort.',
    keywords: 'Custom Dentures Airoli, Complete Dentures Navi Mumbai, Partial Dentures, Removable Teeth Replacement',
    image: '/treatments/dentures.png',
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
        q: 'Can dentures be supported by implants?',
        a: 'Yes. We offer implant-supported overdentures (commonly known as snap-on dentures) which offer exceptional stability and eliminate slipping.'
      }
    ]
  },
  'root-canal': {
    slug: 'root-canal',
    title: 'Root Canal Treatment',
    h1: 'Single-Visit Painless Root Canal Treatment in Airoli',
    description: 'Advanced endodontic therapy to save infected teeth and provide immediate relief.',
    metaTitle: 'Painless Root Canal Treatment in Airoli | Dantved Clinic',
    metaDescription: 'Eliminate tooth pain and save your natural tooth with painless, single-visit root canal therapy at Dantved Clinic, Airoli. Call for emergency dental relief.',
    keywords: 'Root Canal Airoli, Painless Root Canal Navi Mumbai, Single Visit RCT, Endodontist Dentist Airoli',
    image: '/treatments/root-canal.png',
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
  'teeth-whitening': {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    h1: 'Laser Teeth Whitening in Airoli | Brighten Your Smile',
    description: 'Safe, fast laser whitening to lift deep stains and brighten your smile.',
    metaTitle: 'Professional Teeth Whitening in Airoli | Dantved Clinic',
    metaDescription: 'Brighten your smile by up to 8 shades in just one hour. Safe, non-invasive laser teeth whitening treatments at Dantved Clinic in Navi Mumbai.',
    keywords: 'Teeth Whitening Airoli, Laser Teeth Bleaching Navi Mumbai, Smile Brightening, Dental Stains Removal',
    image: '/treatments/teeth-whitening.png',
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
  'pediatric-dentistry': {
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    h1: 'Gentle Pediatric Dentistry & Kids Dental Care in Airoli',
    description: 'Gentle, trust-first dental care for children in a calm, anxiety-free environment.',
    metaTitle: 'Pediatric Dentist in Airoli | Kids Dental Clinic Navi Mumbai',
    metaDescription: 'Help your child build healthy dental habits. Trust-first, painless pediatric dental care, cavity prevention, and habit correction at Dantved Clinic Airoli.',
    keywords: 'Pediatric Dentist Airoli, Kids Dental Clinic Navi Mumbai, Cavity Prevention Children, Children Tooth Dentist',
    image: '/treatments/pediatric-dentistry.png',
    content: [
      'Pediatric dentistry focuses on the unique oral health needs of infants, toddlers, children, and teenagers, promoting healthy habits from an early age.',
      'At Dantved Clinic, our pediatric protocols are designed to be fun, educational, and completely stress-free. We prioritize building a relationship of trust to alleviate any dental fears.',
      'From preventive treatments like fluoride applications and dental sealants to gentle fillings and space maintainers, we ensure your child\'s developing smile is carefully nurtured.'
    ],
    faqs: [
      {
        q: 'When should my child have their first dental visit?',
        a: 'The American Academy of Pediatric Dentistry recommends children visit the dentist by their first birthday or within six months of their first tooth erupting.'
      },
      {
        q: 'What are dental sealants, and are they safe?',
        a: 'Dental sealants are thin protective coatings applied to the chewing surfaces of the back molars to prevent cavities. They are 100% safe, painless to apply, and highly effective.'
      }
    ]
  },
  'oral-surgery': {
    slug: 'oral-surgery',
    title: 'Oral Surgery',
    h1: 'Expert Oral Surgery & Wisdom Tooth Extraction in Airoli',
    description: 'Expert surgical treatments including painless wisdom tooth removal and bone grafting.',
    metaTitle: 'Oral Surgery & Wisdom Tooth Extraction in Airoli | Dantved Clinic',
    metaDescription: 'Expert surgical care at Dantved Clinic. Pain-free wisdom teeth extractions, bone grafting, and minor oral surgeries in a sterile, premium clinic environment.',
    keywords: 'Oral Surgery Airoli, Wisdom Tooth Extraction Navi Mumbai, Painless Teeth Removal, Dental Bone Grafting',
    image: '/treatments/oral-surgery.png',
    content: [
      'Oral surgery includes specialized surgical procedures of the teeth, gums, jawbones, and surrounding facial structures under strict sterile protocols.',
      'We perform wisdom tooth extractions (especially impacted teeth), dental bone grafting for implant preparation, and minor surgical biopsies, ensuring minimum postoperative discomfort.',
      'Using piezosurgery and advanced surgical techniques, we protect nearby nerves and vascular structures, encouraging faster healing times and clean recoveries.'
    ],
    faqs: [
      {
        q: 'What is the recovery time after a wisdom tooth extraction?',
        a: 'Most patients recover fully within 3 to 5 days. We provide detailed postoperative guidelines, cold therapy advice, and prescribed medications to keep you comfortable.'
      },
      {
        q: 'What anesthesia options do you offer for oral surgery?',
        a: 'We offer advanced local anesthesia for complete numbness. For anxious patients, we also provide sedation choices to ensure a relaxing, anxiety-free experience.'
      }
    ]
  }
};
