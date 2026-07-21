"use client";

import type { ApiResponse, AuthResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";
const TOKEN_STORAGE_KEY = "dmhq_access_token";

// Application-identity headers — required on every /api/v1/auth,
// /api/v1/seller request (see backend's router.requireClientAuth), on top
// of whatever user-level auth that route already needs. Not a real secret
// in this app's hands: it's NEXT_PUBLIC_, so it's visible in the browser
// bundle like any other client-side config here.
const CLIENT_HEADERS: Record<string, string> = {
  "X-DMHQ-Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
  "X-DMHQ-Client-Secret": process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let accessToken: string | null = null;
let sessionExpiredCallback: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
  }
  return accessToken;
}

/** Called when a refresh attempt fails, so the app can redirect to /login. */
export function onSessionExpired(cb: () => void) {
  sessionExpiredCallback = cb;
}

/**
 * Mints a fresh access token from the httpOnly refresh_token cookie the
 * backend sets on login/register/accept-invite. Requires the backend's CORS
 * to reflect this origin with credentials enabled (see middleware.CORS).
 * Returns the full response (note: store_slug comes back empty here — the
 * backend only fills it in on login/register, not refresh — callers that
 * need it should fetch GET /seller/store separately).
 */
async function refreshSession(): Promise<AuthResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: CLIENT_HEADERS,
      credentials: "include",
    });
    if (!res.ok) return null;
    const body: ApiResponse<AuthResponse> = await res.json();
    if (!body.success || !body.data) return null;
    setAccessToken(body.data.access_token);
    return body.data;
  } catch {
    return null;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown; // JSON-serialized, unless it's already a FormData instance
  skipAuth?: boolean;
}

async function request<T>(path: string, opts: RequestOptions = {}, isRetry = false): Promise<T> {
  const { method = "GET", body, skipAuth } = opts;
  const isFormData = body instanceof FormData;

  const headers: Record<string, string> = { ...CLIENT_HEADERS };
  if (!isFormData && body !== undefined) headers["Content-Type"] = "application/json";

  const token = getAccessToken();
  if (token && !skipAuth) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isFormData ? (body as FormData) : body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (res.status === 401 && !skipAuth && !isRetry) {
    if (await refreshSession()) return request<T>(path, opts, true);
    setAccessToken(null);
    sessionExpiredCallback?.();
    throw new ApiError(401, "Session expired");
  }

  const json: ApiResponse<T> = await res
    .json()
    .catch(() => ({ success: false, error: "Invalid server response" }) as ApiResponse<T>);

  if (!res.ok || !json.success) {
    throw new ApiError(res.status, json.error || `Request failed (${res.status})`);
  }

  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown, opts?: { skipAuth?: boolean }) =>
    request<T>(path, { method: "POST", body, skipAuth: opts?.skipAuth }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: "PUT", body }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<T>(path, { method: "POST", body: form });
  },
};

export { refreshSession };
