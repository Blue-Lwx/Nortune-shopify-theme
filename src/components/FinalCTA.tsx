import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Truck, RotateCcw } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.2em] uppercase text-primary font-display mb-4"
        >
          Limited stock available
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
        >
          Ready to glow?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground mb-10 max-w-md mx-auto"
        >
          Join thousands of happy customers. Pick your color and never lose your AirPods in the dark again.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/product">
            <Button size="lg" className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-display text-base px-8 py-6 rounded-lg">
              Get Yours Now — $29.99
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Fast Shipping</span>
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Secure Checkout</span>
          <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> 14-Day Guarantee</span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
