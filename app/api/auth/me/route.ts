import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    user: {
      name: session.name || "Joao Santos",
      email: session.email || "joao@barbeariaestilo.com.br",
      role: session.role,
      shopName: session.shopName || "Barbearia Estilo",
      tenantId: session.tenantId,
    },
  });
}
