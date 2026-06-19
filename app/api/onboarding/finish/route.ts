import { NextResponse } from "next/server";

import { createSession } from "@/lib/session";

export async function POST() {
  await createSession({
    userId: "admin_joao_santos",
    tenantId: "barbearia_estilo",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    redirectTo: "/dashboard",
  });
}
