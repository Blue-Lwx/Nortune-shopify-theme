import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Truck, RotateCcw, Sparkles, Search, Feather, BatteryCharging, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, Variant } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialProof from "@/components/SocialProof";
import FAQSection from "@/components/FAQSection";
import productBlue from "@/assets/product-blue.jpeg";
import productOrange from "@/assets/product-orange.jpeg";
import heroImage from "@/assets/hero-image.jpg";
import lifestyleDesk from "@/assets/lifestyle-desk.jpg";
import lifestyleLowlight from "@/assets/lifestyle-lowlight.jpg";

const images: Record<Variant, string[]> = {
  blue: [productBlue, heroImage, lifestyleLowlight],
  orange: [productOrange, lifestyleDesk, lifestyleLowlight],
};

const highlights = [
  { icon: Sparkles, title: "Soft night glow", text: "Charges from room light or sunlight, then glows gently in the dark." },
  { icon: Search, title: "Easy to spot", text: "Find your AirPods faster on a nightstand, desk, couch, or bag." },
  { icon: Feather, title: "Everyday slim", text: "A clean protective shell that keeps the pocket feel light." },
  { icon: BatteryCharging, title: "Charging friendly", text: "Works with wired and wireless charging without removing the case." },
];

const specs = ["Fits AirPods charging cases", "Glow coating recharges with light", "Blue Glow and Orange Glow finishes", "Includes keyring loop"];

const basePrice = 29.99;

const bundleOptions = [
  {
    id: "single",
    quantity: 1,
    title: "1 Case",
    subtitle: "Single case",
    label: "",
    total: basePrice,
    compareAt: basePrice,
    savings: 0,
  },
  {
    id: "popular",
    quantity: 2,
    title: "2 Cases",
    subtitle: "35% off the second case",
    label: "Most Popular",
    total: basePrice + basePrice * 0.65,
    compareAt: basePrice * 2,
    savings: basePrice * 0.35,
  },
  {
    id: "value",
    quantity: 3,
    title: "3 Cases",
    subtitle: "45% off the entire bundle",
    label: "Best Value",
    total: basePrice * 3 * 0.55,
    compareAt: basePrice * 3,
    savings: basePrice * 3 * 0.45,
  },
] as const;

type BundleId = (typeof bundleOptions)[number]["id"];

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const ProductPage = () => {
  const [variant, setVariant] = useState<Variant>("blue");
  const [selectedImage, setSelectedImage] = useState(0);
  const [bundleId, setBundleId] = useState<BundleId>("popular");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const currentImages = images[variant];
  const selectedBundle = bundleOptions.find((bundle) => bundle.id === bundleId) ?? bundleOptions[1];

  const handleAdd = () => {
    addItem(variant, {
      quantity: selectedBundle.quantity,
      totalPrice: selectedBundle.total,
      bundleLabel: selectedBundle.title,
      compareAtPrice: selectedBundle.compareAt,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-24">
        <section className="container mx-auto px-6" id="product">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4 lg:sticky lg:top-24"
            >
              <div className="rounded-lg overflow-hidden bg-card aspect-square">
                <img
                  src={currentImages[selectedImage]}
                  alt={`${variant} Nortune Glow Case product view`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                {currentImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-primary" : "border-border"
                    }`}
                    aria-label={`View product image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase font-display mb-3">Nortune Glow Case</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                Glow-in-the-Dark AirPods Case
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">4.9/5 from glow-in-the-dark case fans</p>
              </div>
              <p className="text-muted-foreground mb-6 max-w-xl leading-relaxed">
                Minimal by day. Easy to find at night. A protective AirPods case with a soft glow finish that recharges under everyday light.
              </p>
              <p className="font-display text-3xl font-bold text-foreground mb-8">{formatPrice(selectedBundle.total)}</p>

              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3">Color: <span className="text-foreground capitalize">{variant} glow</span></p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setVariant("blue"); setSelectedImage(0); }}
                    className={`w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center ${
                      variant === "blue"
                        ? "border-primary glow-blue bg-glow-blue/20"
                        : "border-border bg-muted hover:border-muted-foreground"
                    }`}
                    aria-label="Choose Blue Glow"
                  >
                    {variant === "blue" && <Check className="w-4 h-4 text-primary" />}
                  </button>
                  <button
                    onClick={() => { setVariant("orange"); setSelectedImage(0); }}
                    className={`w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center ${
                      variant === "orange"
                        ? "border-secondary glow-orange bg-glow-orange/20"
                        : "border-border bg-muted hover:border-muted-foreground"
                    }`}
                    aria-label="Choose Orange Glow"
                  >
                    {variant === "orange" && <Check className="w-4 h-4 text-secondary" />}
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-end justify-between gap-4 mb-3">
                  <p className="text-sm text-muted-foreground">Buy more, save more</p>
                </div>
                <div className="grid gap-3">
                  {bundleOptions.map((bundle) => {
                    const selected = bundle.id === bundleId;
                    const bestValue = bundle.id === "value";

                    return (
                      <button
                        key={bundle.id}
                        type="button"
                        onClick={() => setBundleId(bundle.id)}
                        className={`relative rounded-lg border p-4 text-left transition-all ${
                          selected
                            ? "border-primary bg-primary/10 glow-blue"
                            : bestValue
                              ? "border-primary/60 bg-card hover:border-primary"
                              : "border-border bg-card/60 hover:border-muted-foreground"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                            }`}>
                              {selected && <Check className="h-3 w-3" />}
                            </span>
                            <span>
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-display font-semibold text-foreground">{bundle.title}</span>
                                {bundle.label && (
                                  <span className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                    bestValue ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                  }`}>
                                    {bundle.label}
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 block text-sm text-muted-foreground">{bundle.subtitle}</span>
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-display text-lg font-bold text-foreground">{formatPrice(bundle.total)}</p>
                            {bundle.savings > 0 && (
                              <p className="text-xs text-primary">Save {formatPrice(bundle.savings)}</p>
                            )}
                          </div>
                        </div>
                        {bundle.savings > 0 && (
                          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                            <span>Regular price {formatPrice(bundle.compareAt)}</span>
                            <span>{formatPrice(bundle.total / bundle.quantity)} per case</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Soft phosphorescent glow with no battery or LED
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Slim protective shell for everyday carry
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Built for wired and wireless charging
                </li>
              </ul>

              <div className="flex flex-col gap-3 mb-8">
                <Button
                  onClick={handleAdd}
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-display text-base py-6 rounded-lg"
                >
                  {added ? "Added ✓" : `Add ${selectedBundle.quantity} to Cart — ${formatPrice(selectedBundle.total)}`}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">14-Day Guarantee</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Secure Checkout</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="details" className="py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 max-w-6xl mx-auto items-center">
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border border-border bg-card/50 rounded-lg p-5"
                  >
                    <item.icon className="w-5 h-5 text-primary mb-4" />
                    <h2 className="font-display font-semibold text-foreground mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase font-display">Product details</p>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                  Ready for the pocket, desk, and dark.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nortune adds a low-key glow to the item you already reach for every day. Leave it near a lamp, window, or desk light and the finish stores that light for later.
                </p>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  {specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-card/40 py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { src: heroImage, alt: "Nortune Glow Case held at night" },
                { src: lifestyleDesk, alt: "Nortune Glow Case on a desk" },
                { src: lifestyleLowlight, alt: "Nortune Glow Case in low light" },
              ].map((img) => (
                <div key={img.src} className="rounded-lg overflow-hidden aspect-square">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="reviews">
          <SocialProof />
        </div>

        <div id="faq">
          <FAQSection />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-foreground">{formatPrice(selectedBundle.total)}</p>
            <p className="text-xs text-muted-foreground capitalize">{selectedBundle.title} · {variant} glow</p>
          </div>
          <Button
            onClick={handleAdd}
            className="flex-1 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-display rounded-lg"
          >
            {added ? "Added ✓" : `Add — ${formatPrice(selectedBundle.total)}`}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
