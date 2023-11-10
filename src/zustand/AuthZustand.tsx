import { create } from "zustand";

interface AuthZustandInterface {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const AuthZustand = create<AuthZustandInterface>((set) => ({
  user: localStorage.getItem("school-event-user") || null,
  setUser: (user) => {
    localStorage.setItem("school-event-user", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("school-event-user");
    set({ user: null });
  },
}));

export default AuthZustand;
