import type { Answers, Recommendation } from "@/lib/cek-kelayakan";
import type { RegistrationStatus } from "@/lib/admin-data";
import { clearSession, getToken, type AdminUser } from "@/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export type Assessment = {
  id: number;
  kode: string;
  nama: string;
  whatsapp: string;
  jurusan: string;
  bahasa: string | null;
  status: RegistrationStatus;
  sumber: "web-cek-kelayakan" | "langsung";
  answers: Answers | null;
  rekomendasi: Recommendation | null;
  created_at: string;
  updated_at: string;
};

export type CreateAssessmentPayload = {
  nama: string;
  whatsapp: string;
  jurusan: string;
  bahasa?: string | null;
  answers?: Answers;
  rekomendasi?: Recommendation;
  sumber?: "web-cek-kelayakan" | "langsung";
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (res.status === 401) {
    clearSession();
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login?redirect=${next}`;
    }
    throw new ApiError("Sesi berakhir. Silakan masuk kembali.", 401);
  }

  if (!res.ok) {
    let message = `Permintaan gagal (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) {
        message = body.message;
      } else if (body?.errors) {
        const first = Object.values(body.errors)[0];
        if (Array.isArray(first) && typeof first[0] === "string") message = first[0];
      }
    } catch {
      // abaikan
    }
    throw new ApiError(message, res.status);
  }

  return res.json() as Promise<T>;
}

/* --------------------------------- Auth ---------------------------------- */

export function login(email: string, password: string) {
  return request<{ token: string; user: AdminUser }>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function fetchMe() {
  return request<AdminUser>("/me");
}

export type UpdateAccountPayload = {
  name: string;
  email: string;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
};

export function updateAccount(payload: UpdateAccountPayload) {
  return request<AdminUser>("/account", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function logout() {
  return request<{ message: string }>("/logout", { method: "POST" });
}

export function createAssessment(payload: CreateAssessmentPayload) {
  return request<Assessment>("/assessments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function listAssessments() {
  return request<Assessment[]>("/assessments");
}

export function updateAssessment(
  id: number,
  payload: Partial<Pick<Assessment, "nama" | "whatsapp" | "jurusan" | "bahasa" | "status">>,
) {
  return request<Assessment>(`/assessments/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteAssessment(id: number) {
  return request<{ message: string }>(`/assessments/${id}`, { method: "DELETE" });
}
