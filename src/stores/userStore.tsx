import { create } from "zustand";
import {
  getToken,
  removeToken,
  setToken,
} from "../shared/services/TokenService";
import { User } from "../interfaces";
import {
  LoginPayload,
} from "../interfaces/user";
import axiosInstance from "../api/axios/axiosIstance";
import { handleApiError } from "../utils/Tools";

const userStore = (set: any, get: any) => ({
  user: null,
  loading: false,
  loginLoading: false,
  error: null,
  message: null,

  setUser: (user: User) => {
    set({ user });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setMessage: (message: string | null) => {
    set({ message });
  },

  reset: () => {
    set({
      user: null,
      error: null,
      verificationId: null,
    });
  },

  login: async (loginPayload: LoginPayload) => {
    let outcome =  false;
    set({ loginLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", loginPayload);
      set({
        user: response.data.user,
        error: null,
      });

      let verificationId = response.data.verificationId;
      if (verificationId) set({ verificationId: verificationId });

      let token = response.data.accessToken;
      if (token) setToken(token);

      outcome = true;
      set({ message: null });
    } catch (err: any) {
      let error = handleApiError(err);
      set({ error });
    } finally {
      set({ loginLoading: false });
    }
    return outcome;
  },

  logout: () => {
    removeToken();
    get().reset();
  },

  resetMessages: () => {
    get().setError(null);
    get().setMessage(null);
  },

  isAuthenticated: async () => {
   /*  const token = getToken();
    if (token && !get().user) {
      set({ loading: true, error: null });
      try {
        const response = await axiosInstance.get("/users/check/session");
        set({ user: response.data });
      } catch (err: any) {
        let error = handleApiError(err);
        set({ error });
      } finally {
        set({ loading: false });
      }
    } */
  },
});

const useUserStore = create<{
  user: User | null;
  loading: boolean;
  loginLoading: boolean;
  error: string | null;
  message: string | null;
  setUser: (user: User) => void;
  setError: (error: string | null) => void;
  setMessage: (message: string | null) => void;
  reset: () => void;
  resetMessages: () => void;
  login: (loginPayload: LoginPayload) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => Promise<void>;
}>(userStore);

// Vérifier la session de l'utilisateur juste après la création du store
useUserStore.getState().isAuthenticated();

export default useUserStore;
