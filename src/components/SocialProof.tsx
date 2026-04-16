import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  { text: "I keep finding my AirPods instantly now — even in a pitch-black room. Game changer.", author: "Alex M.", rating: 5 },
  { text: "It looks premium in daylight and the glow at night is honestly beautiful. Friends always ask about it.", author: "Jordan K.", rating: 5 },
  { text: "Super lightweight, fits perfectly, and the glow is subtle — not tacky at all. Love the blue one.", author: "Sam T.", rating: 5 },
  { text: "Bought this for traveling. Finding my case in a dark hotel room is so much easier now.", author: "Priya R.", rating: 5 },
  { text: "The orange glow is insane. Looks like a premium product and feels like one too.", author: "Marcus L.", rating: 5 },
  { text: "Wasn't sure about glow-in-the-dark but this is actually classy. 10/10 would recommend.", author: "Taylor W.", rating: 5 },
];

const SocialProof = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm tracking-[0.2em] uppercase text-primary font-display mb-4"
        >
          ★ 4.9/5 from 200+ reviews
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl font-bold text-center text-foreground mb-16"
        >
          People can't stop talking about it
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4 text-sm leading-relaxed">"{review.text}"</p>
              <p className="text-xs text-muted-foreground">— {review.author}</p>
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
              Choose Your Glow
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
