import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Truck, RotateCcw } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Glow in the dark AirPods case held at night"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.2em] uppercase text-primary font-display mb-4"
        >
          ⚡ Selling fast — Limited stock
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]"
        >
          Never lose your AirPods{" "}
          <span className="text-glow-blue animate-pulse-glow">in the dark again</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto"
        >
          A premium AirPods case with a phosphorescent glow — spot it instantly in any dark room.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/product">
            <Button size="lg" className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-display text-base px-8 py-6 rounded-lg">
              Get Yours Now
            </Button>
          </Link>
          <Link to="/product">
            <Button size="lg" variant="outline" className="font-display text-base px-8 py-6 rounded-lg border-border text-foreground hover:bg-foreground/10">
              Choose Your Glow
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Fast Shipping</span>
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Secure Checkout</span>
          <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> 30-Day Guarantee</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
