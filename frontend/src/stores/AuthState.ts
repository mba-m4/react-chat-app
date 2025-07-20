import { create } from "zustand";
import type { Auth } from "@/types/Auth";

export const useAuthStore = create<Auth>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (v) => set({ isLoggedIn: v }),
}));
