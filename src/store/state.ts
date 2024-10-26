import { AuthResponse } from "@/lib/api";
import { create, } from "zustand";

interface StoreData {
  isAuth?: boolean;
  user: AuthResponse;
  setUser?: (user: AuthResponse) => void;
}

export const useStoreData = create<StoreData>((set) => ({
  isAuth: false,
  user: {
    authorization: { refresh_ttl: "", token: "", ttl: "" },
    message: "",
    user: { email: "", full_name: "", account_type: "", id: 0 },
  },
  setUser: (user) =>
    set((state) => ({
      user: {
        ...state.user,
      },
    })),
}));

export const storeState = useStoreData.getState()
