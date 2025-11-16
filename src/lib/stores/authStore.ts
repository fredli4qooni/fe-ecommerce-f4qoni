/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : authStore.ts
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Zustand store for managing user authentication state.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import { createStore } from 'zustand/vanilla';

/**
 * Represents the structure of a logged-in user.
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Defines the state and actions for the authentication store.
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

/**
 * Zustand store for managing global authentication state.
 * This store is not persisted; its state is hydrated by `+layout.ts` on app load.
 */
export const useAuthStore = createStore<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  /**
   * Sets the user state to logged in.
   * @param {User} userData - The user object received from the API.
   */
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  
  /**
   * Resets the user state to logged out.
   */
  logout: () => set({ user: null, isAuthenticated: false }),
}));