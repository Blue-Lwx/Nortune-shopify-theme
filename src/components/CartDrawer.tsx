import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-card border-border w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-foreground">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4 flex-1">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-12">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className={`w-12 h-12 rounded-lg ${item.variant === "blue" ? "glow-blue bg-glow-blue/20" : "glow-orange bg-glow-orange/20"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.bundleLabel ? `${item.bundleLabel} · ` : ""}${`$${(item.price * item.quantity).toFixed(2)}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-muted-foreground hover:text-foreground">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm w-6 text-center text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-muted-foreground hover:text-foreground">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex justify-between mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display font-bold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display">
              Checkout
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">Secure checkout powered by Shopify</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
