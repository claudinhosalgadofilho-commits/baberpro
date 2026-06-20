import { NextResponse } from "next/server";

import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const account = body.account && typeof body.account === "object" ? body.account : {};
    const barberShop = body.barberShop && typeof body.barberShop === "object" ? body.barberShop : {};
    const settings = body.settings && typeof body.settings === "object" ? body.settings : {};
    const name = typeof account.adminName === "string" && account.adminName.trim() ? account.adminName.trim() : "Joao Santos";
    const email = typeof account.email === "string" && account.email.trim() ? account.email.trim().toLowerCase() : "";
    const shopName =
      typeof settings.fantasyName === "string" && settings.fantasyName.trim()
        ? settings.fantasyName.trim()
        : typeof barberShop.fantasyName === "string" && barberShop.fantasyName.trim()
          ? barberShop.fantasyName.trim()
          : "Barbearia Estilo";
    const password = typeof account.password === "string" && account.password.length >= 8 ? account.password : "";

    if (!email) {
      return NextResponse.json({ ok: false, message: "E-mail da conta nao encontrado." }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ ok: false, message: "Senha da conta nao encontrada. Volte para a etapa Sua Conta e informe a senha novamente." }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const shop = await tx.barberShop.create({
        data: {
          name: shopName,
          slug: createSlug(shopName),
          document: typeof barberShop.document === "string" ? barberShop.document : null,
          phone: typeof barberShop.phone === "string" ? barberShop.phone : null,
          email: typeof barberShop.email === "string" ? barberShop.email : email,
          address: typeof barberShop.address === "string" ? barberShop.address : null,
          city: typeof barberShop.city === "string" ? barberShop.city : null,
          state: typeof barberShop.state === "string" ? barberShop.state : null,
          timezone: "America/Sao_Paulo",
          logoUrl: "/barberpro-logo-login.png",
        },
      });

      const user = await tx.user.upsert({
        where: { email },
        update: {
          name,
          passwordHash: hashPassword(password),
          isActive: true,
        },
        create: {
          name,
          email,
          passwordHash: hashPassword(password),
          isActive: true,
        },
      });

      await tx.shopMembership.upsert({
        where: {
          userId_shopId: {
            userId: user.id,
            shopId: shop.id,
          },
        },
        update: { role: "OWNER" },
        create: {
          userId: user.id,
          shopId: shop.id,
          role: "OWNER",
        },
      });

      const barber = await tx.barber.create({
        data: {
          shopId: shop.id,
          userId: user.id,
          name: "Carlos Eduardo",
          specialty: "Barbeiro especialista",
          commissionRate: 0.4,
        },
      });

      await tx.service.createMany({
        data: defaultServices(shop.id),
      });

      return { shop, user, barber };
    });

    await createSession({
      userId: result.user.id,
      tenantId: result.shop.id,
      role: "ADMIN",
      name,
      email,
      shopName,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("Erro ao finalizar onboarding", error);
    const message = error instanceof Error && error.message.includes("Can't reach database server")
      ? "Nao foi possivel conectar ao Supabase agora. Verifique a conexao do banco e tente novamente."
      : "Nao foi possivel finalizar o cadastro agora. Verifique a conexao com o banco e tente novamente.";

    return NextResponse.json(
      { ok: false, message },
      { status: 500 },
    );
  }
}

function createSlug(value: string) {
  const base =
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "barbearia";

  return `${base}-${Date.now().toString(36)}`;
}

function defaultServices(shopId: string) {
  return [
    {
      shopId,
      name: "Corte Degrade",
      description: "Corte de cabelo degrade",
      durationMin: 40,
      priceCents: 6000,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Corte Social",
      description: "Corte tradicional",
      durationMin: 30,
      priceCents: 4000,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Barba",
      description: "Aparar e modelar barba",
      durationMin: 30,
      priceCents: 4000,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Barba + Toalha Quente",
      description: "Barba completa com toalha quente",
      durationMin: 45,
      priceCents: 5500,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Pigmentacao",
      description: "Pigmentacao capilar",
      durationMin: 60,
      priceCents: 12000,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Hidratacao Capilar",
      description: "Hidratacao e nutricao dos fios",
      durationMin: 50,
      priceCents: 8000,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Sobrancelha",
      description: "Design de sobrancelha",
      durationMin: 20,
      priceCents: 3000,
      color: "#D4A017",
      isActive: true,
    },
    {
      shopId,
      name: "Corte + Barba",
      description: "Corte de cabelo + barba",
      durationMin: 70,
      priceCents: 9000,
      color: "#D4A017",
      isActive: true,
    },
  ];
}
