import { getSession } from "@/lib/session";

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return session;
}
