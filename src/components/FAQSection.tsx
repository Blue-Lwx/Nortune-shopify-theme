import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "How long does the glow last?", a: "After full light exposure, the glow lasts 2–4 hours at its brightest, then gradually fades. A few minutes under any light source recharges it instantly." },
  { q: "Which AirPods models does it fit?", a: "The case is compatible with AirPods Pro (1st & 2nd gen) and AirPods 3rd gen. Check the product page for exact model compatibility." },
  { q: "Does it interfere with wireless charging?", a: "Not at all. The case is designed to work seamlessly with both wireless and wired charging — no need to remove it." },
  { q: "How long does shipping take?", a: "Orders ship within 1–2 business days. Standard delivery takes 5–7 business days. Express shipping options are available at checkout." },
  { q: "What's your return policy?", a: "We offer a 14-day money-back guarantee. If you're not satisfied, return it — no questions asked." },
  { q: "Is it durable?", a: "Built with shock-absorbent material that protects against drops and scratches. The phosphorescent coating is sealed and won't wear off with normal use." },
];

const FAQSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground font-display mb-4"
        >
          Got questions?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-16"
        >
          Everything you need to know
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-foreground hover:text-foreground/80 text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
