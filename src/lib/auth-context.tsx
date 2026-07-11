"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api, getAccessToken, onSessionExpired, refreshSession, setAccessToken } from "./api";
import type { AuthResponse, StaffRole } from "./types";

export interface AuthUser {
  userId: string;
  storeId: string;
  storeSlug: string;
  staffRole: StaffRole;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  store_name: string;
  store_slug: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  completeOAuthLogin: (accessToken: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toUser(res: AuthResponse): AuthUser {
  return { userId: res.user_id, storeId: res.store_id, storeSlug: res.store_slug, staffRole: res.staff_role };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onSessionExpired(() => {
      setUser(null);
      router.replace("/login");
    });
  }, [router]);

  // Restore a session after a page reload: the access token lives in
  // memory/localStorage but a real reload loses in-memory state, so fall
  // back to the httpOnly refresh cookie.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getAccessToken()) {
        setIsLoading(false);
        return;
      }
      const res = await refreshSession();
      if (cancelled) return;
      if (res) {
        setUser(toUser(res));
      } else {
        setAccessToken(null);
      }
      setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post<AuthResponse>("/api/v1/auth/login", { email, password }, { skipAuth: true });
    setAccessToken(res.access_token);
    setUser(toUser(res));
  }

  async function register(input: RegisterInput) {
    const res = await api.post<AuthResponse>("/api/v1/auth/register", input, { skipAuth: true });
    setAccessToken(res.access_token);
    setUser(toUser(res));
  }

  // Google OAuth's callback redirect only carries access_token/store_id in
  // the URL (see auth.GoogleHandler.Callback) — it can't include
  // store_slug/staff_role too without leaking them into browser history, so
  // this trades the access token for the full profile via the same
  // httpOnly refresh cookie the callback's redirect response already set.
  async function completeOAuthLogin(accessToken: string): Promise<boolean> {
    setAccessToken(accessToken);
    const res = await refreshSession();
    if (!res) {
      setAccessToken(null);
      return false;
    }
    setUser(toUser(res));
    return true;
  }

  function logout() {
    setAccessToken(null);
    setUser(null);
    router.replace("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, completeOAuthLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
