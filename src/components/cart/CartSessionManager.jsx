"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/user/cart/cart.store";

export default function CartSessionManager() {
  const initializeGuestCart = useCartStore((state) => state.initializeGuestCart);

  useEffect(() => {
    initializeGuestCart();
  }, [initializeGuestCart]);

  return null;
}
