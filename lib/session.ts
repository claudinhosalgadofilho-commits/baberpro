import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "barberpro_session";

export type BarberProSession = {
  userId: string;
  tenantId: string;
  role: "ADMIN";
  createdAt: string;
};

export async function createSession(session: BarberProSession) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, Buffer.from(JSON.stringify(session)).toString("base64url"), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as BarberProSession;
  } catch {
    return null;
  }
}
