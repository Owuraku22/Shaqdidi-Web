<<<<<<< HEAD
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse } from '@/lib/api';

interface StoreState {
  user: AuthResponse['user'] | null;
  isAuth: boolean;
  authToken: string | null;
  fbToken: string | null;
  setUser: (user: AuthResponse['user']) => void;
  setAuthToken: (token: string) => void;
  setFbToken: (token: string) => void;
  logout: () => void;
}

export const useStoreData = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      isAuth: false,
      authToken: null,
      fbToken: null,
      setUser: (user) => set({ user, isAuth: true }),
      setAuthToken: (token) => set({ authToken: token }),
      setFbToken: (token) => set({ fbToken: token }),
      logout: () => set({ user: null, isAuth: false, authToken: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // user: state.user,
        authToken: state.authToken,
        fbToken: state.fbToken,
      }),
    }
  )
);

// Helper function to check if a route is protected
export const isProtectedRoute = (path: string): boolean => {
  const protectedRoutes = ['/nsp', '/ps']; // Add more protected routes as needed
  return protectedRoutes.some(route => path.startsWith(route));
};

// Hook to use in components that need authentication
export const useAuth = () => {
  const { isAuth, user, authToken, fbToken } = useStoreData();
  return { isAuth, user, authToken, fbToken };
};
=======
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
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
