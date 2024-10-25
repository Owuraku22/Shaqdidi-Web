import { AuthResponse } from "@/lib/api";
import { create } from "zustand";

interface StoreData {
  isAuth: boolean;
  user: AuthResponse["user"];
  setUser: (user: AuthResponse["user"]) => void;
}

export const useStoreData = create<StoreData>((set) => ({
  isAuth: false,
  user: { email: "", full_name: "", account_type: "", id: 0 },
  setUser: (user: StoreData["user"]) => set({ user: { ...user } }),
}));
