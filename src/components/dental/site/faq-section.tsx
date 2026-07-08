"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';

type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  faqs?: FaqItem[];
};

const defaultFaqs: FaqItem[] = [
  {
    q: 'Do I need an appointment before visiting?',
    a: 'Appointments are recommended to reduce waiting time and ensure adequate consultation. We accommodate walk-ins, whenever possible, subject to availability.'
  },
  {
    q: 'How often should I visit the dentist?',
    a: 'A routine dental examination every six months helps detect problems early and maintain good oral health.'
  },
  {
    q: 'Do you treat dental emergencies?',
    a: 'Yes. We provide emergency dental care for severe toothaches, broken teeth, swelling, infections and lost crowns.'
  },
  {
    q: 'Is the clinic equipped with modern technology?',
    a: 'Yes. We use modern diagnostic and treatment equipment while following strict sterilization and infection control protocols.'
  },
  {
    q: 'Which is better: tooth extraction or root canal?',
    a: 'Whenever possible, we prefer preserving your natural tooth through root canal treatment. Extraction is considered only when the tooth cannot be saved.'
  },
  {
    q: 'What are dental implants?',
    a: 'Dental implants are titanium fixtures placed in the jawbone to replace missing tooth roots. They provide a strong foundation for crowns, bridges, or dentures. A clinical examination and imaging help determine bone quality and treatment suitability.'
  },
  {
    q: 'What is a smile makeover?',
    a: 'A smile makeover combines treatments such as veneers, whitening, crowns, orthodontics, or gum contouring to improve your smile\'s appearance.'
  },
  {
    q: 'How do you ensure patient safety?',
    a: 'We follow strict sterilization protocols using medical-grade sterilization equipment, disposable materials where appropriate, and internationally accepted infection control practices.'
  },
  {
    q: 'What if I have doctor anxiety?',
    a: 'We offer aromatherapy, a calm environment, noise-cancelling comfort, weighted cushions, and step-by-step walk-through of the procedure to help your nervous system settle.'
  }
];

export const FaqSection = ({ faqs }: FaqSectionProps) => {
  const displayFaqs = faqs ?? defaultFaqs;

  return (
    <section id="faq" className="bg-warm/40 py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionLabel index="07" title="FAQ" />
          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.25rem)] leading-tight">
            Questions, answered with clarity.
          </h2>
        </motion.div>
        <Accordion type="single" collapsible className="w-full">
          {displayFaqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="font-display text-xl">{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
