import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import productBlue from "@/assets/product-blue.jpeg";
import productOrange from "@/assets/product-orange.jpeg";

const ProductShowcase = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 font-display"
        >
          Two variants
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-6"
        >
          Choose your glow
        </motion.h2>
        <p className="text-center text-muted-foreground max-w-md mx-auto mb-14">
          A clean AirPods case that stays low-key in daylight and glows softly when the room goes dark.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden bg-card"
          >
            <img
              src={productBlue}
              alt="Blue glow AirPods case"
              className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <p className="font-display font-semibold text-foreground">Blue Glow</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-muted-foreground">$29.99</p>
                <span className="flex items-center gap-1 text-xs text-primary"><Flame className="w-3 h-3" /> Popular choice</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative rounded-2xl overflow-hidden bg-card"
          >
            <img
              src={productOrange}
              alt="Orange glow AirPods case"
              className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <p className="font-display font-semibold text-foreground">Orange Glow</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-muted-foreground">$29.99</p>
                <span className="flex items-center gap-1 text-xs text-orange-400"><Flame className="w-3 h-3" /> Selling fast</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/product">
            <Button size="lg" className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-display text-base px-8 py-6 rounded-lg">
              Get Yours Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
