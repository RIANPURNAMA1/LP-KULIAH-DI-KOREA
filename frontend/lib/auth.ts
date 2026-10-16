export const TOKEN_COOKIE = "kdk_admin_token";
const USER_COOKIE = "kdk_admin_user";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 hari
export const SESSION_EVENT = "kdk:session";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
};

function notify() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(SESSION_EVENT));
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAge = MAX_AGE) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function getToken(): string | null {
  return readCookie(TOKEN_COOKIE);
}

export function getStoredUser(): AdminUser | null {
  const raw = readCookie(USER_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: AdminUser) {
  writeCookie(TOKEN_COOKIE, token);
  writeCookie(USER_COOKIE, JSON.stringify(user));
  notify();
}

export function clearSession() {
  removeCookie(TOKEN_COOKIE);
  removeCookie(USER_COOKIE);
  notify();
}
