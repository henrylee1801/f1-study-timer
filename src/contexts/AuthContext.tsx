'use client';

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth, isFirebaseEnabled } from '@/lib/firebase/config';
import { userService } from '@/services/user.service';
import useUserStore from '@/stores/User.store';
import { useOverlayStore } from '@/stores/Overlay.store';
import { useTasks } from '@/hooks/useTasks';
import { useSettings } from '@/hooks/useSettings';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { fetchProfile, clearProfile } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { loadTasks, wipeTasks } = useTasks();
  const { loadConfig, wipeConfig } = useSettings();
  const pendingUsername = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Static/offline build: no Firebase project. Skip auth entirely and just
    // render the app (timer, exam mode, settings all run on localStorage).
    if (!isFirebaseEnabled) {
      setLoading(false);
      return;
    }

    // Fail-safe: if auth never resolves, still render instead of hanging.
    const failSafe = setTimeout(() => setLoading(false), 2500);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(failSafe);
      setUser(user);

      if (user) {
        let userData = await userService.getUserData(user.uid);

        if (!userData) {
          await userService.create(user, pendingUsername.current);
          pendingUsername.current = undefined;
          userData = await userService.getUserData(user.uid);
        }

        loadConfig(userData?.preferences);
        useOverlayStore.getState().applySettings(userData?.overlay ?? null);

        await Promise.all([loadTasks(user.uid), fetchProfile(user.uid)]);
      }

      setLoading(false);
    });

    return () => {
      clearTimeout(failSafe);
      unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, username?: string) => {
    pendingUsername.current = username;
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (result.user) {
      await sendEmailVerification(result.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    pendingUsername.current = undefined;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth).then(async () => {
      setUser(null);
      await wipeTasks();
      await wipeConfig();
      clearProfile();
      useOverlayStore.getState().clear();
    });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
