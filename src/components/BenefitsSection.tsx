import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Palette, Shield, Feather } from "lucide-react";

const benefits = [
  { icon: Eye, title: "Instantly visible in the dark", desc: "No more fumbling around — find your AirPods case the second the lights go out." },
  { icon: Palette, title: "Premium glowing aesthetic", desc: "A soft phosphorescent finish that looks stunning in low-light without being flashy." },
  { icon: Shield, title: "Full protection, zero bulk", desc: "Shock-absorbent material guards against drops, scratches, and everyday wear." },
  { icon: Feather, title: "Ultra-lightweight & portable", desc: "Barely adds any weight — slides into your pocket just like your bare AirPods case." },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm tracking-[0.2em] uppercase text-primary font-display mb-4"
        >
          Why people love it
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-16"
        >
          More than just a case
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 group-hover:glow-blue transition-shadow duration-500">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link to="/product">
            <Button size="lg" className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-display text-base px-8 py-6 rounded-lg">
              Get Yours Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
