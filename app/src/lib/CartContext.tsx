import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { findProduct, fmt } from './data';

export interface CartLine {
  id: string;
  qty: number;
}

export interface ShippingOption {
  id: string;
  nom: string;
  note: string;
  prix: number;
}

// Prices shown per option in the checkout's "mode de livraison" step — kept
// here (not duplicated in Checkout.tsx) so the selected option actually
// drives the total instead of just being a decorative radio list.
export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'express', nom: 'Express Abidjan — sous 24 h', note: 'Créneau 8 h–12 h ou 14 h–18 h', prix: 2000 },
  { id: 'standard', nom: 'Standard Abidjan — 48 à 72 h', note: 'Créneau au choix', prix: 1000 },
  { id: 'interieur', nom: 'Intérieur du pays — 72 h', note: 'Via partenaire transport', prix: 4500 },
  { id: 'retrait', nom: 'Retrait en boutique', note: 'Cocody Angré · sous 2 h', prix: 0 },
];

interface CartContextValue {
  cart: CartLine[];
  add: (id: string, n: number) => void;
  setQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  cartCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  subtotalLabel: string;
  shippingLabel: string;
  discountLabel: string;
  totalLabel: string;
  shippingOptionId: string;
  setShippingOption: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// Matches the prototype's default state — a pack + 3 ramettes already in
// the cart so the cart/checkout screens aren't empty on first load.
const INITIAL_CART: CartLine[] = [
  { id: 'p4', qty: 1 },
  { id: 'p2', qty: 3 },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(INITIAL_CART);
  const [shippingOptionId, setShippingOption] = useState('express');

  const add = (id: string, n: number) => {
    setCart((prev) => {
      const next = prev.map((l) => ({ ...l }));
      const line = next.find((l) => l.id === id);
      if (line) line.qty += n;
      else next.push({ id, qty: n });
      return next;
    });
  };

  const setQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((l) => (l.id === id ? { id, qty: Math.max(1, l.qty + delta) } : l)));
  };

  const remove = (id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  };

  const value = useMemo<CartContextValue>(() => {
    const subtotal = cart.reduce((t, l) => t + findProduct(l.id).prix * l.qty, 0);
    const option = SHIPPING_OPTIONS.find((o) => o.id === shippingOptionId) ?? SHIPPING_OPTIONS[0];
    const shipping = subtotal > 0 ? option.prix : 0;
    const discount = subtotal >= 50000 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal + shipping - discount;
    return {
      cart,
      add,
      setQty,
      remove,
      cartCount: cart.reduce((t, l) => t + l.qty, 0),
      subtotal,
      shipping,
      discount,
      total,
      subtotalLabel: fmt(subtotal),
      shippingLabel: shipping ? fmt(shipping) : 'Gratuit',
      discountLabel: discount ? '−' + fmt(discount) : '—',
      totalLabel: fmt(total),
      shippingOptionId,
      setShippingOption,
    };
  }, [cart, shippingOptionId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
