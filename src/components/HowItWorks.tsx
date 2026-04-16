import { motion } from "framer-motion";
import { Sun, Moon, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-16"
        >
          How it works
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center flex-1"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <Sun className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Absorbs light during the day</h3>
            <p className="text-sm text-muted-foreground">Natural or artificial light charges the phosphorescent layer.</p>
          </motion.div>

          <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block shrink-0" />
          <div className="w-px h-8 bg-border md:hidden" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center flex-1"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Moon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Reveals a soft glow in the dark</h3>
            <p className="text-sm text-muted-foreground">A subtle, calming glow that fades naturally over time.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
