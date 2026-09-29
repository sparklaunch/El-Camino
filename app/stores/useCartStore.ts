import { create } from "zustand";
import { persist } from "zustand/middleware";
import Dish from "../types/Dish";

interface CartState {
    cart: Dish[];
    addToCart: (dish: Dish) => void;
}

export const useCartStore = create<CartState>()(persist(set => ({
    cart: [],
    addToCart: (dish: Dish) => set(state => ({cart: [...state.cart, dish]}))
}), {name: "cart-storage"}));