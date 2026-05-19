import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { SectionLabel } from '@/components/dental/ui/section-label';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'Is treatment painless?',
    a: 'Yes. We use gentle anesthesia, noise-cancelling comfort, and paced visits so you remain calm throughout every procedure.'
  },
  {
    q: 'Do you accept insurance?',
    a: 'We work with major Indian insurers and provide transparent estimates before treatment begins. Our concierge can guide your claims.'
  },
  {
    q: 'How fast can I get an appointment?',
    a: 'Same-week consultations are often available for new patients. Virtual assessments can begin within 24 hours.'
  },
  {
    q: 'Do you treat children?',
    a: 'Absolutely. Our pediatric suite is designed for trust-first experiences with playful, unhurried care.'
  },
  {
    q: 'What if I have dental anxiety?',
    a: 'We offer aromatherapy, weighted blankets, sedation options, and step-by-step explanations to help your nervous system settle.'
  }
];

export const FaqSection = () => (
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
        {faqs.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="font-display text-xl">{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
