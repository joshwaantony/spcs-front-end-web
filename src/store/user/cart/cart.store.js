"use client";

import { create } from "zustand";
import {
  ensureCartSessionId,
  persistCartSessionId,
  readCartSessionId,
} from "@/lib/cart-session";

export const useCartStore = create((set) => ({
  cartSessionId: "",
  bootstrapped: false,

  initializeGuestCart: () => {
    const cartSessionId = ensureCartSessionId();

    set({
      cartSessionId,
      bootstrapped: true,
    });

    return cartSessionId;
  },

  syncCartSessionId: (cartSessionId) => {
    const nextCartSessionId = persistCartSessionId(cartSessionId);

    set({
      cartSessionId: nextCartSessionId || readCartSessionId(),
      bootstrapped: true,
    });
  },
}));
