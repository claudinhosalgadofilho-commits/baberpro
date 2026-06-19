import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/session";

const publicRoutes = [
  "/",
  "/login",
  "/recuperar-senha",
  "/cadastro-barbearia",
  "/cadastro-conta",
  "/cadastro-configuracoes",
  "/cadastro-confirmacao",
  "/escolha-plano",
];

const protectedPrefixes = [
  "/dashboard",
  "/agenda",
  "/agendamentos",
  "/clientes",
  "/servicos",
  "/profissionais",
  "/equipe",
  "/financeiro",
  "/estoque",
  "/relatorios",
  "/marketing",
  "/configuracoes",
];

function isPublic(pathname: string) {
  return publicRoutes.includes(pathname) || pathname.startsWith("/cadastro/") || pathname.startsWith("/api/onboarding/");
}

function isProtected(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function hasValidSession(request: NextRequest) {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) {
    return false;
  }

  try {
    const normalized = raw.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const session = JSON.parse(atob(padded)) as {
      userId?: string;
      tenantId?: string;
      role?: string;
    };

    return Boolean(session.userId && session.tenantId && session.role);
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = hasValidSession(request);

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isLoggedIn && isProtected(pathname) && !isPublic(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"],
};
