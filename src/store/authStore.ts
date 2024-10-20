import { User } from "@/types/authType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;

  setUser: (user: User) => void;

  clearUser: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,

      setUser: (user: User) => {
        set(() => ({ user }));
      },

      clearUser: () => {
        set(() => ({ user: null }));
      },
    }),
    {
      name: "user",
    }
  )
);
