import { motion } from "framer-motion";
import heroImage from "@/assets/hero-image.jpg";
import lifestyleDesk from "@/assets/lifestyle-desk.jpg";
import lifestyleLowlight from "@/assets/lifestyle-lowlight.jpg";

const LifestyleSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm tracking-[0.2em] uppercase text-primary font-display mb-4"
        >
          Made for your lifestyle
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          For every low-light moment
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-16 max-w-md mx-auto"
        >
          Whether it's your nightstand, a dimmed office, or a late-night commute — it just works.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { src: heroImage, alt: "Using glowing AirPods case at night on the street" },
            { src: lifestyleDesk, alt: "Glowing case on a desk setup" },
            { src: lifestyleLowlight, alt: "Case glowing in low-light environment" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden aspect-square"
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
