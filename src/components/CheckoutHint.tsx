import { getCheckoutSuggestion } from "@/lib/darts";

interface CheckoutHintProps {
  remaining: number;
}

export function CheckoutHint({ remaining }: CheckoutHintProps) {
  const checkout = getCheckoutSuggestion(remaining);

  if (!checkout) return null;

  return (
    <div className="bg-amber-900/50 border border-amber-600 rounded-xl p-3 text-center">
      <span className="text-amber-400 text-sm">Checkout: </span>
      <span className="text-white font-semibold">{checkout.join(" → ")}</span>
    </div>
  );
}
