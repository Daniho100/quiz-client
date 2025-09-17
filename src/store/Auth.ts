// import { create } from 'zustand';

// interface AuthState {
//   token: string | null;
//   user: { id: number; name: string; email: string, role: } | null;
//   setAuth: (token: string, user: { id: number; email: string }) => void;
//   clearAuth: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: localStorage.getItem('token'),
//   user: localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user')!)
//     : null,
//   setAuth: (token, user) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     set({ token, user });
//   },
//   clearAuth: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     set({ token: null, user: null });
//   },
// }));





import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin"; // ✅ explicitly type role
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  setAuth: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
